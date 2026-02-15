"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Zap, Shield, Building2, ArrowRight } from "lucide-react";
import { Button, Badge, Card, CardHeader, CardBody, CardFooter } from "@/components/ui";
import { PricingHero } from "./PricingHero";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PricingTier {
  id: string;
  name: string;
  icon: React.ReactNode;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  description: string;
  badge?: string;
  highlighted: boolean;
  features: Array<{ text: string; included: boolean }>;
  cta: string;
  ctaVariant: "primary" | "secondary" | "ghost";
  ctaHref: string;
}

// ─── DATA ──────────────────────────────────────────────────────────────────────

const tiers: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    icon: <Shield size={22} />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Cocok untuk freelancer yang baru memulai.",
    highlighted: false,
    features: [
      { text: "5 invoice per bulan", included: true },
      { text: "1 klien", included: true },
      { text: "Template dasar", included: true },
      { text: "Email support", included: true },
      { text: "Invoice unlimited", included: false },
      { text: "Laporan keuangan", included: false },
      { text: "Reminder otomatis", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Mulai Gratis",
    ctaVariant: "secondary",
    ctaHref: "/register",
  },
  {
    id: "pro",
    name: "Pro",
    icon: <Zap size={22} />,
    monthlyPrice: 99000,
    yearlyPrice: 79200,
    description: "Untuk freelancer & bisnis kecil yang aktif.",
    badge: "Paling Populer",
    highlighted: true,
    features: [
      { text: "Invoice unlimited", included: true },
      { text: "Klien unlimited", included: true },
      { text: "Semua template", included: true },
      { text: "Laporan keuangan", included: true },
      { text: "Reminder otomatis", included: true },
      { text: "Priority support", included: true },
      { text: "Multi user (tim)", included: false },
      { text: "API access & White label", included: false },
    ],
    cta: "Coba 14 Hari Gratis",
    ctaVariant: "primary",
    ctaHref: "/register?plan=pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: <Building2 size={22} />,
    monthlyPrice: null,
    yearlyPrice: null,
    description: "Solusi lengkap untuk tim & perusahaan.",
    highlighted: false,
    features: [
      { text: "Semua fitur Pro", included: true },
      { text: "Multi user (tim)", included: true },
      { text: "API access", included: true },
      { text: "White label", included: true },
      { text: "Dedicated support", included: true },
      { text: "Custom integrations", included: true },
      { text: "Invoice unlimited", included: true },
      { text: "Laporan keuangan lanjutan", included: true },
    ],
    cta: "Hubungi Kami",
    ctaVariant: "secondary",
    ctaHref: "/contact",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

// ─── PRICE DISPLAY ────────────────────────────────────────────────────────────

function PriceDisplay({
  tier,
  isYearly,
}: {
  tier: PricingTier;
  isYearly: boolean;
}) {
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice;

  if (price === null) {
    return (
      <div className="mt-2 mb-1">
        <span className="text-4xl font-bold text-slate-900">Custom</span>
      </div>
    );
  }

  if (price === 0) {
    return (
      <div className="mt-2 mb-1">
        <span className="text-4xl font-bold text-slate-900">Rp 0</span>
        <span className="text-slate-400 text-sm ml-1">/bulan</span>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isYearly ? "yearly" : "monthly"}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        className="mt-2 mb-1"
      >
        <span className="text-4xl font-bold text-slate-900">
          {formatRupiah(price)}
        </span>
        <span className="text-slate-400 text-sm ml-1">/bulan</span>
        {isYearly && (
          <p className="text-emerald-600 text-xs font-medium mt-0.5">
            Ditagih tahunan · Hemat{" "}
            {formatRupiah((tier.monthlyPrice! - price) * 12)}/thn
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

function TierCard({
  tier,
  isYearly,
  index,
}: {
  tier: PricingTier;
  isYearly: boolean;
  index: number;
}) {
  const highlighted = tier.highlighted;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className={[
        "relative flex flex-col rounded-2xl",
        highlighted
          ? "ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/20 scale-[1.03] bg-white z-10"
          : "border border-slate-200 bg-white shadow-sm",
      ].join(" ")}
    >
      {/* Popular badge */}
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="info" className="px-4 py-1 text-xs font-semibold shadow-sm">
            {tier.badge}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="px-7 pt-8 pb-0">
        <div
          className={[
            "inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4",
            highlighted
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          {tier.icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
        <p className="text-slate-500 text-sm mt-1">{tier.description}</p>
        <PriceDisplay tier={tier} isYearly={isYearly} />
      </div>

      {/* Divider */}
      <div className="mx-7 mt-6 border-t border-slate-100" />

      {/* Features */}
      <div className="px-7 py-6 flex-1">
        <ul className="space-y-3">
          {tier.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              {feature.included ? (
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check size={12} className="text-emerald-600" strokeWidth={3} />
                </span>
              ) : (
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                  <Minus size={12} className="text-slate-400" strokeWidth={2.5} />
                </span>
              )}
              <span
                className={
                  feature.included ? "text-slate-700" : "text-slate-400"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-7 pb-8">
        <Button
          variant={tier.ctaVariant}
          size="lg"
          rightIcon={<ArrowRight size={16} />}
          className="w-full justify-center"
          onClick={() => (window.location.href = tier.ctaHref)}
        >
          {tier.cta}
        </Button>
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function PricingCards() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <PricingHero isYearly={isYearly} onToggle={setIsYearly} />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {tiers.map((tier, index) => (
              <TierCard
                key={tier.id}
                tier={tier}
                isYearly={isYearly}
                index={index}
              />
            ))}
          </div>

          {/* Trust note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center text-slate-400 text-sm mt-10"
          >
            Tidak perlu kartu kredit untuk memulai. Cancel kapan saja.
          </motion.p>
        </div>
      </section>
    </>
  );
}

export default PricingCards;
