# InvoiceKu

`InvoiceKu` adalah SaaS invoicing untuk freelancer, UMKM, dan bisnis kecil di Indonesia. Repository ini sudah berkembang dari landing page foundation menjadi MVP web app dengan authentication, onboarding bisnis, manajemen klien, invoice CRUD, status tracking, halaman print invoice, dan integrasi Supabase.

## Ringkasan Produk

InvoiceKu dirancang untuk kebutuhan invoicing yang sederhana dan cepat:

- membuat dan mengelola invoice
- menyimpan data klien
- mengatur profil bisnis
- melacak status invoice: `draft`, `sent`, `paid`, `overdue`, `cancelled`
- melihat ringkasan dashboard
- mengirim invoice via email bila `RESEND_API_KEY` tersedia
- menyiapkan invoice untuk print atau ekspor PDF melalui browser print dialog

Selain area aplikasi, repo ini juga masih memiliki marketing site lengkap:

- landing page
- pricing page
- contact page
- legal pages

## Tech Stack

- `Next.js 16` dengan App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Framer Motion`
- `Lucide React`
- `Supabase` untuk auth, database, dan session handling SSR
- `Zod` untuk validasi input
- `Resend` untuk email invoice opsional
- `ESLint`

## Status Implementasi Saat Ini

Yang sudah tersedia di repo:

- auth email/password dengan Supabase
- register, login, forgot password, reset password
- callback auth dan sign out route
- onboarding profil bisnis pertama kali
- dashboard ringkasan invoice dan klien
- CRUD klien
- CRUD invoice
- item baris invoice
- auto invoice numbering berbasis prefix bisnis
- status history invoice
- pengaturan akun
- pengaturan profil bisnis termasuk informasi rekening bank
- contact form yang menyimpan pesan ke database
- print-friendly invoice page
- pengiriman invoice via email bila Resend dikonfigurasi

Yang masih layak dianggap next step:

- test automated
- analytics yang benar-benar berbasis data bisnis, bukan placeholder view
- PDF generator server-side khusus, bukan mengandalkan print browser
- subscription/billing SaaS
- reminder otomatis dan automation workflow
- domain email production untuk pengiriman invoice

## Routes Utama

### Marketing

| Route | Keterangan |
| --- | --- |
| `/` | Landing page utama |
| `/pricing` | Halaman pricing |
| `/contact` | Form kontak |
| `/privacy` | Kebijakan privasi |
| `/terms` | Syarat dan ketentuan |

### Authentication

| Route | Keterangan |
| --- | --- |
| `/login` | Login pengguna |
| `/register` | Registrasi akun |
| `/forgot-password` | Minta reset password |
| `/reset-password` | Set password baru setelah callback auth |
| `/auth/callback` | Route callback Supabase auth |
| `/auth/signout` | Route sign out |

### App Workspace

| Route | Keterangan |
| --- | --- |
| `/onboarding` | Setup bisnis pertama kali |
| `/dashboard` | Ringkasan workspace |
| `/clients` | Daftar klien |
| `/clients/[clientId]` | Detail dan edit klien |
| `/invoices` | Daftar invoice |
| `/invoices/new` | Buat invoice baru |
| `/invoices/[invoiceId]` | Detail dan edit invoice |
| `/invoices/[invoiceId]/print` | Tampilan print invoice |
| `/settings/account` | Pengaturan akun |
| `/settings/business` | Pengaturan profil bisnis |
| `/analytics` | Halaman analytics awal |

## Setup Lokal

### 1. Install dependency

```bash
npm install
```

### 2. Siapkan environment variables

Salin `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi variabel berikut:

| Variable | Wajib | Keterangan |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Ya | Base URL aplikasi, contoh `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Anon key Supabase untuk client dan SSR |
| `RESEND_API_KEY` | Tidak | API key Resend untuk kirim email invoice |

### 3. Siapkan Supabase

Buat project Supabase lalu jalankan migrasi SQL berikut secara berurutan:

1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_invoice_discount_mode.sql`
3. `supabase/migrations/003_business_bank_fields.sql`

Schema utama yang dibuat:

- `users`
- `businesses`
- `clients`
- `invoices`
- `invoice_items`
- `invoice_status_history`
- `contact_messages`

Migrasi awal juga mencakup:

- enum status invoice
- trigger sinkronisasi `public.users` dari `auth.users`
- trigger auto `updated_at`
- auto invoice numbering berbasis `invoice_prefix`
- helper function untuk akses berbasis owner workspace

### 4. Konfigurasi Supabase Auth

Di dashboard Supabase, pastikan redirect URL mengizinkan callback berikut:

- `http://localhost:3000/auth/callback`
- URL production yang nanti dipakai, misalnya `https://app.domainmu.com/auth/callback`

Jika memakai email confirmation atau password reset, URL callback ini wajib benar.

### 5. Jalankan app

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Arsitektur Singkat

### 1. Next.js App Router

Semua route memakai App Router. Route group dipakai untuk memisahkan:

- `(auth)` untuk halaman auth tanpa mengubah URL publik
- `(app)` untuk workspace setelah login

### 2. Server Actions

Mutasi data utama ditangani melalui server actions di `lib/actions/*`:

- `auth.ts`
- `business.ts`
- `clients.ts`
- `contact.ts`
- `invoices.ts`

Pendekatan ini cukup pragmatis untuk MVP karena:

- validasi dekat dengan mutation logic
- tidak perlu menambah REST layer yang belum dibutuhkan
- mudah dipakai langsung dari App Router forms

### 3. Supabase SSR

Integrasi Supabase dibagi menjadi:

- `lib/supabase/client.ts`
- `lib/supabase/server.ts`
- `lib/supabase/proxy.ts`

Query otorisasi workspace dipusatkan di `lib/queries/auth.ts` untuk memastikan halaman app hanya bisa diakses user yang login dan sudah onboarding.

### 4. Validasi dan Formatting

- validator input ada di `lib/validators/*`
- formatter tanggal, mata uang, dan label invoice ada di `lib/formatters/*`
- kalkulasi invoice dipusatkan di `lib/invoice-calculations.ts`

### 5. UI Layer

Struktur UI dibagi cukup jelas:

- `components/sections/*` untuk marketing pages
- `components/app/*` untuk workspace app
- `components/ui/*` untuk primitive reusable
- `components/layout/*` untuk shared shell marketing

## Struktur Folder

```text
app/
  (app)/
    analytics/
    clients/
    dashboard/
    invoices/
    onboarding/
    settings/
  (auth)/
    forgot-password/
    login/
    register/
    reset-password/
  auth/
    callback/
    signout/
  contact/
  pricing/
  privacy/
  terms/
  layout.tsx
  page.tsx

components/
  app/
  auth/
  layout/
  legal/
  providers/
  sections/
    home/
    pricing/
  ui/

lib/
  actions/
  formatters/
  queries/
  supabase/
  validators/
  database.types.ts
  design-tokens.ts
  env.ts
  invoice-calculations.ts

supabase/
  migrations/
```

## Cara Membaca Project

Kalau mau memahami project dengan urutan tercepat, baca file-file ini:

1. `app/layout.tsx`
2. `app/page.tsx`
3. `app/(app)/layout.tsx`
4. `app/(app)/dashboard/page.tsx`
5. `components/app/AppShell.tsx`
6. `components/app/BusinessProfileForm.tsx`
7. `components/app/InvoiceForm.tsx`
8. `lib/queries/auth.ts`
9. `lib/actions/invoices.ts`
10. `supabase/migrations/001_initial_schema.sql`

## Catatan Produk dan Engineering

- Aplikasi saat ini mengasumsikan satu owner utama untuk satu bisnis.
- Invoice numbering memakai `invoice_prefix` + sequence otomatis, contoh `INV-0001`.
- Email invoice tetap bisa ditandai sebagai terkirim walau `RESEND_API_KEY` belum diisi; hanya pengiriman email otomatis yang dilewati.
- Tampilan print invoice sudah ada, sehingga ekspor PDF paling sederhana bisa memakai fitur print browser.
