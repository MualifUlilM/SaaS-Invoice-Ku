import type { Metadata } from "next";
import { PricingCards } from "@/components/sections/pricing/PricingCards";
import { ComparisonTable } from "@/components/sections/pricing/ComparisonTable";
import { PricingFAQ } from "@/components/sections/pricing/PricingFAQ";
import { PricingCTA } from "@/components/sections/pricing/PricingCTA";

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Harga - InvoiceKu",
  description:
    "Pilih paket InvoiceKu yang sesuai kebutuhan bisnis Anda. Mulai gratis, upgrade kapan saja. Harga transparan tanpa biaya tersembunyi untuk freelancer, UMKM, dan enterprise.",
  openGraph: {
    title: "Harga - InvoiceKu",
    description:
      "Paket Free, Pro, dan Enterprise untuk semua skala bisnis. Coba 14 hari gratis tanpa kartu kredit.",
    url: "https://invoiceku.id/pricing",
  },
  alternates: {
    canonical: "https://invoiceku.id/pricing",
  },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      {/* Hero + Cards (client component handles toggle state) */}
      <PricingCards />

      {/* Feature comparison table */}
      <ComparisonTable />

      {/* FAQ accordion */}
      <PricingFAQ />

      {/* Final CTA */}
      <PricingCTA />
    </>
  );
}
