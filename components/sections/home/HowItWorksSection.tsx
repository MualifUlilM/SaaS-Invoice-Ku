"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, FileText, Banknote } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Daftar & Setup Profil",
    description:
      "Buat akun gratis dalam 2 menit. Lengkapi profil bisnis dan logo untuk invoice yang terlihat profesional.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Buat Invoice Pertama",
    description:
      "Pilih template, masukkan detail klien, item pekerjaan, dan nominal. Invoice siap dalam hitungan detik.",
  },
  {
    number: "03",
    icon: Banknote,
    title: "Kirim & Terima Bayaran",
    description:
      "Kirim invoice via email atau WhatsApp. Pantau statusnya dan terima notifikasi saat pembayaran masuk.",
  },
];

// ─── STEP CARD ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  isInView,
}: {
  step: typeof steps[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" as const, delay: index * 0.18 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Number */}
      <div className="relative mb-6">
        <span
          className="absolute -top-4 -left-4 text-6xl font-black leading-none select-none"
          style={{ color: "rgba(79,70,229,0.08)" }}
        >
          {step.number}
        </span>
        <div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-md glow-primary"
          style={{ background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)" }}
        >
          <Icon size={26} className="text-white" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-800 mb-3">{step.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{step.description}</p>
    </motion.div>
  );
}

// ─── HOW IT WORKS SECTION ─────────────────────────────────────────────────────

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionWrapper id="cara-kerja" background="gray">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Cara Kerja</p>
        <h2 className="mb-4">Mulai dalam 3 Langkah</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Tidak perlu training atau setup yang rumit. Langsung pakai dan rasakan perbedaannya.
        </p>
      </div>

      <div ref={ref} className="relative">
        {/* Connecting line — desktop only */}
        <div className="hidden lg:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default HowItWorksSection;
