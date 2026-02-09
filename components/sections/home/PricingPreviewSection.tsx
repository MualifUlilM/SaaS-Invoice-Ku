"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const tiers = [
  {
    name: "Free",
    price: "Gratis",
    period: "selamanya",
    description: "Untuk mulai mencoba dan freelancer dengan volume kecil.",
    features: [
      "5 invoice per bulan",
      "1 klien aktif",
      "Template dasar",
      "Kirim via email",
      "PDF download",
    ],
    cta: "Mulai Gratis",
    ctaVariant: "secondary" as const,
    ctaHref: "/register",
    highlighted: false,
    accentColor: "border-slate-200",
    headerBg: "bg-slate-50",
  },
  {
    name: "Pro",
    price: "Rp 99.000",
    period: "per bulan",
    description: "Untuk freelancer aktif dan UKM yang butuh fitur lengkap.",
    features: [
      "Invoice tidak terbatas",
      "Klien tidak terbatas",
      "15+ template premium",
      "Kirim via Email & WhatsApp",
      "Reminder otomatis",
      "Laporan keuangan lengkap",
      "Branding logo kustom",
    ],
    cta: "Coba 14 Hari Gratis",
    ctaVariant: "primary" as const,
    ctaHref: "/register",
    highlighted: true,
    accentColor: "border-indigo-500",
    headerBg: "bg-gradient-to-br from-indigo-600 to-indigo-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "hubungi kami",
    description: "Untuk tim dan perusahaan dengan kebutuhan khusus.",
    features: [
      "Semua fitur Pro",
      "Multi-user & tim",
      "API integration",
      "Dedicated support",
      "Custom domain",
      "SLA 99.9% uptime",
    ],
    cta: "Hubungi Sales",
    ctaVariant: "secondary" as const,
    ctaHref: "mailto:sales@invoiceku.id",
    highlighted: false,
    accentColor: "border-slate-200",
    headerBg: "bg-slate-50",
  },
];

// ─── PRICING CARD ─────────────────────────────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.12 },
  }),
};

function PricingCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={[
        "relative flex flex-col rounded-2xl border-2 overflow-hidden",
        tier.accentColor,
        tier.highlighted ? "shadow-2xl scale-[1.03] z-10" : "shadow-sm",
      ].join(" ")}
    >
      {tier.highlighted && (
        <div className="absolute top-4 right-4">
          <Badge variant="success" className="text-xs font-semibold gap-1">
            <Zap size={11} />
            Paling Populer
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className={`px-6 pt-8 pb-6 ${tier.headerBg}`}>
        <h3
          className={`text-xl font-bold mb-1 ${
            tier.highlighted ? "text-white" : "text-slate-800"
          }`}
        >
          {tier.name}
        </h3>
        <p
          className={`text-sm mb-4 ${
            tier.highlighted ? "text-indigo-200" : "text-slate-500"
          }`}
        >
          {tier.description}
        </p>
        <div className="flex items-end gap-1">
          <span
            className={`text-3xl font-black ${
              tier.highlighted ? "text-white" : "text-slate-800"
            }`}
          >
            {tier.price}
          </span>
          <span
            className={`text-sm mb-1 ${
              tier.highlighted ? "text-indigo-200" : "text-slate-400"
            }`}
          >
            /{tier.period}
          </span>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white flex-1 px-6 py-6 flex flex-col">
        <ul className="space-y-3 flex-1 mb-6">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-600">
              <Check
                size={15}
                className={tier.highlighted ? "text-indigo-500 shrink-0" : "text-emerald-500 shrink-0"}
              />
              {feature}
            </li>
          ))}
        </ul>

        <Link href={tier.ctaHref}>
          <Button variant={tier.ctaVariant} size="lg" className="w-full">
            {tier.cta}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── PRICING PREVIEW SECTION ──────────────────────────────────────────────────

export function PricingPreviewSection() {
  return (
    <SectionWrapper id="harga" background="gray">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Harga</p>
        <h2 className="mb-4">Harga Transparan, Tanpa Kejutan</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Pilih paket yang sesuai kebutuhan. Upgrade atau downgrade kapan saja, tanpa biaya tersembunyi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-10">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} />
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
        >
          Lihat Detail Harga & Perbandingan Lengkap
          <ArrowRight size={16} />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}

export default PricingPreviewSection;
