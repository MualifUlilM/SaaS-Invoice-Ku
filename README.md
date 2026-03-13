# InvoiceKu Landing Page

## Deskripsi Project

`InvoiceKu` adalah project SaaS berbasis web untuk membantu freelancer, UMKM, dan bisnis kecil Indonesia dalam membuat, mengirim, dan melacak invoice dengan lebih rapi dan efisien.

Repository ini saat ini berisi fondasi produk SaaS `InvoiceKu`, mencakup landing page, halaman pricing, contact, login/register, serta halaman legal yang disiapkan sebagai bagian dari proses pengembangan menuju rilis.

## Tech Stack

- `Next.js 16`
  Framework utama dengan App Router untuk routing dan struktur aplikasi.
- `React 19`
  Library UI untuk membangun komponen dan halaman.
- `TypeScript`
  Menjaga kode tetap terstruktur, aman, dan mudah di-maintain.
- `Tailwind CSS v4`
  Utility-first CSS untuk styling layout dan komponen.
- `Framer Motion`
  Dipakai untuk animasi dan transisi antarelemen.
- `Lucide React`
  Library ikon yang digunakan di berbagai section dan UI components.
- `ESLint`
  Menjaga konsistensi dan kualitas kode selama development.

## Halaman Yang Tersedia

| Route | Fungsi |
| --- | --- |
| `/` | Landing page utama berisi hero, fitur, cara kerja, testimoni, preview pricing, FAQ, dan CTA akhir |
| `/pricing` | Halaman paket harga dengan toggle billing, comparison table, FAQ, dan CTA |
| `/contact` | Halaman kontak dengan validasi form client-side, siap dilanjutkan ke integrasi backend |
| `/login` | Halaman login dengan validasi form, password input, dan CTA OAuth yang siap dihubungkan ke provider auth |
| `/register` | Halaman register dengan password strength, validasi client-side, dan alur siap dilanjutkan ke backend |
| `/privacy` | Halaman kebijakan privasi dengan sidebar navigasi section |
| `/terms` | Halaman syarat dan ketentuan dengan sidebar navigasi section |

## Cara Menjalankan

Pastikan dependency sudah ter-install:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Lalu buka `http://localhost:3000`.

Script yang tersedia:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Cara Membaca Project

Kalau tujuanmu adalah memahami project ini dengan cepat, urutan baca yang paling efisien:

1. `app/layout.tsx`
   Untuk melihat shell global, metadata SEO, font, navbar, dan footer.
2. `app/page.tsx`
   Untuk memahami komposisi landing page homepage.
3. `components/sections/home/*`
   Untuk melihat section marketing per blok.
4. `app/pricing/page.tsx` dan `components/sections/pricing/*`
   Untuk halaman pricing dan reusable pricing blocks.
5. `app/(auth)/*`
   Untuk flow login/register yang sudah disiapkan di sisi UI dan validasi awal.
6. `components/ui/*`
   Untuk komponen dasar seperti button, input, badge, dan card.
7. `lib/design-tokens.ts`
   Untuk token warna, spacing, shadow, motion, dan breakpoint.

## Struktur Folder

```text
app/
  (auth)/
    login/
    register/
  contact/
  pricing/
  privacy/
  terms/
  layout.tsx
  page.tsx

components/
  auth/
  layout/
  legal/
  sections/
    home/
    pricing/
  ui/

lib/
  design-tokens.ts
```

## Gambaran Arsitektur

### 1. App Router

Semua route berada di folder `app/`. Route group `(auth)` dipakai untuk mengelompokkan halaman auth tanpa mengubah URL akhir, sehingga route tetap menjadi `/login` dan `/register`.

### 2. Section-Based UI

Homepage dan pricing page dibangun dari section terpisah. Pola ini memudahkan edit copywriting, susun ulang section, dan memecah tanggung jawab komponen.

### 3. Shared UI Primitives

Komponen seperti `Button`, `Input`, `Badge`, dan `Card` dipakai ulang di banyak halaman agar style dan perilaku interaksi tetap konsisten.

### 4. Brand Tokens

File `lib/design-tokens.ts` menyimpan palet warna, typography, spacing, radius, shadow, dan motion variants untuk menjaga konsistensi visual.

## Status Implementasi Saat Ini

Project ini sudah memiliki fondasi produk yang cukup lengkap di sisi frontend, dengan beberapa integrasi inti yang masih perlu dilanjutkan:

- Belum ada integrasi database
- Integrasi auth provider masih dalam tahap lanjutan
- Form `contact`, `login`, dan `register` saat ini masih memakai state lokal dan belum tersambung ke service/backend final
- Beberapa link, domain, email, dan identitas brand masih bisa disesuaikan lebih lanjut sesuai kebutuhan final

## Known Issues

Saat dicek dengan `npm run lint` pada 13 Maret 2026, hasilnya masih belum bersih:

- Error di `components/layout/Navbar.tsx`
- Error di `components/legal/LegalSidebar.tsx`
- Error unescaped quotes di `components/sections/home/TestimonialsSection.tsx`
- Warning minor di `app/contact/page.tsx`
- Warning minor di `app/(auth)/login/page.tsx`
- Warning minor di `components/sections/pricing/PricingCards.tsx`

Artinya project ini sudah layak dipelajari dan diteruskan, tapi belum siap dianggap finished secara engineering.

## Area Yang Paling Mudah Di-customize

Kalau kamu mau mengubah project ini untuk brand lain, mulai dari sini:

- `app/layout.tsx`
  Metadata global, title template, domain, social preview
- `components/layout/Navbar.tsx`
  Navigasi dan CTA header
- `components/layout/Footer.tsx`
  Link perusahaan, legal, dan social
- `components/sections/home/*`
  Copywriting homepage
- `components/sections/pricing/*`
  Tier pricing dan feature comparison
- `app/privacy/page.tsx` dan `app/terms/page.tsx`
  Konten legal

## Saran Next Step

Prioritas yang paling masuk akal setelah ini:

1. Rapikan error lint agar baseline project stabil.
2. Sambungkan form auth/contact ke backend dan auth provider final.
3. Tambahkan assets brand final seperti logo, OG image, dan favicon lengkap.
4. Tambahkan analytics dan event tracking untuk CTA utama.
5. Tambahkan test minimal untuk komponen form dan navigasi.

## Catatan

Nama produk, domain, email, paket harga, serta isi dokumen legal di repo ini masih perlu divalidasi ulang bila project ini akan dipakai untuk deployment publik atau dijadikan brand final.
