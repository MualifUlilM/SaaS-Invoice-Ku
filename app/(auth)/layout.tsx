import type { Metadata } from "next";

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Masuk — InvoiceKu",
    template: "%s | InvoiceKu",
  },
  description: "Masuk atau daftar ke InvoiceKu — Platform manajemen invoice untuk freelancer dan bisnis Indonesia.",
};

// ─── AUTH LAYOUT ──────────────────────────────────────────────────────────────
// Layout ini TIDAK mewarisi Navbar/Footer dari root layout.
// Hanya render children langsung tanpa wrapper tambahan.

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
