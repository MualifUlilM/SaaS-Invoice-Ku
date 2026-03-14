alter table public.invoices
add column if not exists discount_type text not null default 'fixed'
check (discount_type in ('fixed', 'percentage'));

alter table public.invoices
add column if not exists discount_value numeric(10,2) not null default 0;

update public.invoices
set discount_value = discount_amount
where discount_amount > 0
  and discount_value = 0;
