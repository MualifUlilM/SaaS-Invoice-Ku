"use client";

import { motion } from "framer-motion";
import { FileText, Send, TrendingUp, BarChart3, Users, Bell } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: FileText,
    color: "bg-indigo-100 text-indigo-600",
    title: "Buat Invoice Instan",
    description:
      "Buat invoice profesional dalam hitungan detik dengan template yang sudah siap pakai dan branding bisnis kamu.",
  },
  {
    icon: Send,
    color: "bg-emerald-100 text-emerald-600",
    title: "Kirim via Email & WhatsApp",
    description:
      "Kirim invoice langsung ke klien melalui email atau WhatsApp tanpa perlu unduh dan attach file manual.",
  },
  {
    icon: TrendingUp,
    color: "bg-violet-100 text-violet-600",
    title: "Lacak Pembayaran",
    description:
      "Pantau status pembayaran setiap invoice secara real-time — mana yang sudah lunas, menunggu, atau jatuh tempo.",
  },
  {
    icon: BarChart3,
    color: "bg-sky-100 text-sky-600",
    title: "Laporan Keuangan",
    description:
      "Dapatkan ringkasan pendapatan bulanan, tren pembayaran, dan analisis bisnis dalam satu dashboard yang rapi.",
  },
  {
    icon: Users,
    color: "bg-rose-100 text-rose-600",
    title: "Multi Klien",
    description:
      "Kelola database klien tanpa batas. Simpan informasi kontak, riwayat transaksi, dan catatan untuk setiap klien.",
  },
  {
    icon: Bell,
    color: "bg-amber-100 text-amber-600",
    title: "Reminder Otomatis",
    description:
      "Sistem pengingat otomatis mengirim notifikasi ke klien sebelum dan setelah jatuh tempo — tanpa kamu perlu follow-up manual.",
  },
];

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
} as const;

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── FEATURE CARD ─────────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  color,
  title,
  description,
}: {
  icon: React.ElementType;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(79,70,229,0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" as const }}
      className="group bg-white rounded-2xl p-6 border border-slate-100 cursor-default"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`}>
        <Icon size={22} />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ─── FEATURES SECTION ─────────────────────────────────────────────────────────

export function FeaturesSection() {
  return (
    <SectionWrapper id="fitur" background="white">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative text-center mb-14">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Fitur Unggulan</p>
        <h2 className="mb-4">Semua yang Kamu Butuhkan</h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          Dari pembuatan invoice hingga laporan keuangan, InvoiceKu hadir sebagai solusi lengkap untuk bisnis kamu.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

export default FeaturesSection;
