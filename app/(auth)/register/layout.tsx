import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Gratis - InvoiceKu",
  description:
    "Buat akun gratis InvoiceKu dan mulai kelola invoice bisnis Anda hari ini.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
