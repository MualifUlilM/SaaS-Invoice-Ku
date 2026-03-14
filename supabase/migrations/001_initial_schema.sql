create extension if not exists pgcrypto;

create type public.invoice_status as enum (
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create type public.contact_message_status as enum (
  'new',
  'in_review',
  'resolved'
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null unique references public.users(id) on delete cascade,
  name text not null,
  slug text not null unique,
  logo_url text,
  email text,
  phone text,
  address text,
  city text,
  province text,
  postal_code text,
  country text not null default 'Indonesia',
  currency_code text not null default 'IDR',
  invoice_prefix text not null default 'INV',
  next_invoice_number integer not null default 1,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  company_name text,
  email text,
  phone text,
  address text,
  notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete restrict,
  invoice_number text not null unique,
  status public.invoice_status not null default 'draft',
  issue_date date not null,
  due_date date not null,
  currency_code text not null default 'IDR',
  subtotal_amount integer not null default 0,
  discount_amount integer not null default 0,
  tax_amount integer not null default 0,
  total_amount integer not null default 0,
  amount_paid integer not null default 0,
  notes text,
  payment_instructions text,
  sent_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint invoices_due_after_issue check (due_date >= issue_date),
  constraint invoices_non_negative_amounts check (
    subtotal_amount >= 0
    and discount_amount >= 0
    and tax_amount >= 0
    and total_amount >= 0
    and amount_paid >= 0
  )
);

create unique index if not exists invoices_business_id_invoice_number_idx
  on public.invoices (business_id, invoice_number);

create table if not exists public.invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  sort_order integer not null default 0,
  description text not null,
  quantity numeric(12,2) not null,
  unit_price_amount integer not null,
  line_total_amount integer not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint invoice_items_positive_quantity check (quantity > 0),
  constraint invoice_items_non_negative_amounts check (
    unit_price_amount >= 0 and line_total_amount >= 0
  )
);

create table if not exists public.invoice_status_history (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  from_status public.invoice_status,
  to_status public.invoice_status not null,
  changed_by_user_id uuid references public.users(id) on delete set null,
  note text,
  changed_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  email text not null,
  topic text not null,
  message text not null,
  status public.contact_message_status not null default 'new',
  source text not null default 'website-contact-form',
  submitted_at timestamptz not null default timezone('utc', now())
);

create index if not exists clients_business_id_idx on public.clients (business_id);
create index if not exists invoices_business_id_idx on public.invoices (business_id);
create index if not exists invoices_client_id_idx on public.invoices (client_id);
create index if not exists invoice_items_invoice_id_idx on public.invoice_items (invoice_id);
create index if not exists invoice_status_history_invoice_id_idx on public.invoice_status_history (invoice_id);
create index if not exists contact_messages_status_idx on public.contact_messages (status);

create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.email, ''),
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update
  set email = excluded.email,
      full_name = coalesce(excluded.full_name, public.users.full_name),
      avatar_url = coalesce(excluded.avatar_url, public.users.avatar_url),
      updated_at = timezone('utc', now());

  return new;
end;
$$;

create or replace function public.is_owner_of_business(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.businesses
    where id = target_business_id
      and owner_user_id = auth.uid()
  );
$$;

create or replace function public.is_owner_of_invoice(target_invoice_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.invoices
    join public.businesses on public.businesses.id = public.invoices.business_id
    where public.invoices.id = target_invoice_id
      and public.businesses.owner_user_id = auth.uid()
  );
$$;

create or replace function public.assign_invoice_number()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  business_record public.businesses%rowtype;
  next_sequence integer;
begin
  if new.invoice_number is not null and new.invoice_number <> '' then
    return new;
  end if;

  select *
  into business_record
  from public.businesses
  where id = new.business_id
  for update;

  if not found then
    raise exception 'Business not found for invoice creation';
  end if;

  next_sequence := business_record.next_invoice_number;
  new.invoice_number := upper(business_record.invoice_prefix) || '-' || lpad(next_sequence::text, 4, '0');
  new.currency_code := coalesce(new.currency_code, business_record.currency_code, 'IDR');

  update public.businesses
  set next_invoice_number = next_invoice_number + 1,
      updated_at = timezone('utc', now())
  where id = business_record.id;

  return new;
end;
$$;

create or replace function public.track_invoice_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.invoice_status_history (
      invoice_id,
      from_status,
      to_status,
      changed_by_user_id
    )
    values (
      new.id,
      null,
      new.status,
      auth.uid()
    );

    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.invoice_status_history (
      invoice_id,
      from_status,
      to_status,
      changed_by_user_id
    )
    values (
      new.id,
      old.status,
      new.status,
      auth.uid()
    );
  end if;

  return new;
end;
$$;

drop trigger if exists handle_users_updated_at on public.users;
create trigger handle_users_updated_at
before update on public.users
for each row
execute function public.handle_updated_at();

drop trigger if exists handle_businesses_updated_at on public.businesses;
create trigger handle_businesses_updated_at
before update on public.businesses
for each row
execute function public.handle_updated_at();

drop trigger if exists handle_clients_updated_at on public.clients;
create trigger handle_clients_updated_at
before update on public.clients
for each row
execute function public.handle_updated_at();

drop trigger if exists handle_invoices_updated_at on public.invoices;
create trigger handle_invoices_updated_at
before update on public.invoices
for each row
execute function public.handle_updated_at();

drop trigger if exists on_auth_user_changed on auth.users;
create trigger on_auth_user_changed
after insert or update on auth.users
for each row
execute function public.handle_auth_user();

drop trigger if exists assign_invoice_number on public.invoices;
create trigger assign_invoice_number
before insert on public.invoices
for each row
execute function public.assign_invoice_number();

drop trigger if exists track_invoice_status on public.invoices;
create trigger track_invoice_status
after insert or update on public.invoices
for each row
execute function public.track_invoice_status();

alter table public.users enable row level security;
alter table public.businesses enable row level security;
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_items enable row level security;
alter table public.invoice_status_history enable row level security;
alter table public.contact_messages enable row level security;

create policy "users_select_own_profile"
on public.users
for select
using (auth.uid() = id);

create policy "users_insert_own_profile"
on public.users
for insert
with check (auth.uid() = id);

create policy "users_update_own_profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "businesses_manage_own"
on public.businesses
for all
using (owner_user_id = auth.uid())
with check (owner_user_id = auth.uid());

create policy "clients_manage_own_business"
on public.clients
for all
using (public.is_owner_of_business(business_id))
with check (public.is_owner_of_business(business_id));

create policy "invoices_manage_own_business"
on public.invoices
for all
using (public.is_owner_of_business(business_id))
with check (public.is_owner_of_business(business_id));

create policy "invoice_items_manage_own_invoice"
on public.invoice_items
for all
using (public.is_owner_of_invoice(invoice_id))
with check (public.is_owner_of_invoice(invoice_id));

create policy "invoice_status_history_select_own_invoice"
on public.invoice_status_history
for select
using (public.is_owner_of_invoice(invoice_id));

create policy "invoice_status_history_insert_own_invoice"
on public.invoice_status_history
for insert
with check (public.is_owner_of_invoice(invoice_id));

create policy "contact_messages_public_insert"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

create policy "contact_messages_authenticated_select"
on public.contact_messages
for select
to authenticated
using (true);
