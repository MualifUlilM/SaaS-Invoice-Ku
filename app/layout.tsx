import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootShell } from "@/components/providers/RootShell";

// ─── FONT ─────────────────────────────────────────────────────────────────────

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default:  "InvoiceKu — Invoice Mudah untuk Freelancer & Bisnis Indonesia",
    template: "%s | InvoiceKu",
  },
  description:
    "Buat, kirim, dan lacak invoice profesional dalam hitungan menit. Platform manajemen invoice terpercaya untuk freelancer dan small business owner Indonesia.",
  keywords: [
    "invoice",
    "manajemen invoice",
    "freelancer indonesia",
    "software invoice",
    "invoice online",
    "pembayaran invoice",
    "bisnis kecil",
    "UMKM",
  ],
  authors:  [{ name: "InvoiceKu" }],
  creator:  "InvoiceKu",
  publisher:"InvoiceKu",
  metadataBase: new URL("https://invoiceku.id"),
  openGraph: {
    type:        "website",
    locale:      "id_ID",
    url:         "https://invoiceku.id",
    siteName:    "InvoiceKu",
    title:       "InvoiceKu — Invoice Mudah untuk Freelancer & Bisnis Indonesia",
    description: "Buat, kirim, dan lacak invoice profesional dalam hitungan menit.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "InvoiceKu — Platform Manajemen Invoice Indonesia",
      },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "InvoiceKu — Invoice Mudah untuk Freelancer & Bisnis Indonesia",
    description: "Buat, kirim, dan lacak invoice profesional dalam hitungan menit.",
    images:      ["/og-image.png"],
    creator:     "@invoiceku",
  },
  robots: {
    index:             true,
    follow:            true,
    googleBot: {
      index:           true,
      follow:          true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":    -1,
    },
  },
  icons: {
    icon:    [{ url: "/favicon.ico" }],
    apple:   [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor:  "#4F46E5",
  width:       "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── ROOT LAYOUT ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased min-h-screen bg-white text-slate-900">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
