"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface PricingHeroProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function PricingHero({ isYearly, onToggle }: PricingHeroProps) {
  return (
    <section className="bg-hero-gradient pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Badge variant="info" className="text-sm px-3 py-1">
            Harga Transparan, Tanpa Kejutan
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4"
        >
          Pilih Paket yang Tepat{" "}
          <span className="text-gradient">untuk Bisnis Anda</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10"
        >
          Mulai gratis, upgrade kapan saja. Semua paket sudah termasuk fitur
          inti manajemen invoice tanpa biaya tersembunyi.
        </motion.p>

        {/* Monthly / Yearly Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full p-1 shadow-sm"
        >
          <button
            onClick={() => onToggle(false)}
            className={[
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
              !isYearly
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            Bulanan
          </button>

          <button
            onClick={() => onToggle(true)}
            className={[
              "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2",
              isYearly
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            Tahunan
            <Badge
              variant="success"
              className="text-xs font-semibold py-0 leading-5"
            >
              Hemat 20%
            </Badge>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingHero;
