"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";
import { SectionWrapper } from "@/components/layout";

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden:  { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const mockupVariants = {
  hidden:  { opacity: 0, x: 40, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.3 },
  },
};

// ─── DASHBOARD MOCKUP ─────────────────────────────────────────────────────────

function DashboardMockup() {
  const invoices = [
    { id: "INV-001", client: "PT Maju Bersama",  amount: "Rp 5.500.000",  status: "Lunas",   color: "text-emerald-600 bg-emerald-50" },
    { id: "INV-002", client: "CV Karya Mandiri", amount: "Rp 2.750.000",  status: "Pending", color: "text-amber-600 bg-amber-50"   },
    { id: "INV-003", client: "Toko Berkah Jaya",  amount: "Rp 1.200.000",  status: "Lunas",   color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
      {/* Glow backdrop */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
        style={{ background: "linear-gradient(135deg, #4F46E5 0%, #10B981 100%)" }}
      />

      {/* Main card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-float">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs text-slate-400 font-medium">InvoiceKu Dashboard</span>
        </div>

        <div className="p-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Total Invoice", value: "48", color: "text-indigo-600" },
              { label: "Sudah Dibayar", value: "Rp 24.5jt", color: "text-emerald-600" },
              { label: "Menunggu", value: "Rp 4.2jt", color: "text-amber-600" },
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Invoice list */}
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Invoice Terbaru</p>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-slate-800">{inv.client}</p>
                  <p className="text-xs text-slate-400">{inv.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">{inv.amount}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${inv.color}`}>
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Target Bulan Ini</span>
              <span>83%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: "83%", background: "linear-gradient(90deg, #4F46E5, #10B981)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating notification badge */}
      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-3 py-2 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 size={16} className="text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-800">Pembayaran Masuk!</p>
          <p className="text-xs text-slate-500">Rp 5.500.000</p>
        </div>
      </div>

      {/* Floating label bottom */}
      <div className="absolute -bottom-4 -left-4 bg-indigo-600 text-white rounded-2xl shadow-lg px-4 py-2">
        <p className="text-xs font-bold">10.000+ Pengguna Aktif</p>
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <SectionWrapper id="hero" background="gradient" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-4rem)] py-8">
        {/* Left: Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="info" className="mb-6 text-sm px-4 py-1.5">
              ✨ Dipercaya 10.000+ freelancer Indonesia
            </Badge>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-6">
            Kelola Invoice Bisnis Anda,{" "}
            <span className="text-gradient">Lebih Mudah dan Cepat</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg text-slate-500 mb-8 max-w-xl">
            Buat, kirim, dan lacak invoice profesional dalam hitungan menit.
            Fokus pada pekerjaan — biarkan InvoiceKu yang mengurus administrasinya.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/register">
              <Button size="lg" variant="primary" rightIcon={<ArrowRight size={18} />}>
                Coba Gratis 14 Hari
              </Button>
            </Link>
            <Link href="/#fitur">
              <Button size="lg" variant="ghost" leftIcon={<Play size={16} />}>
                Lihat Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-sm text-slate-500">
            {["Tidak perlu kartu kredit", "Setup dalam 2 menit", "Batalkan kapan saja"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Dashboard mockup */}
        <motion.div
          variants={mockupVariants}
          initial="hidden"
          animate="visible"
          className="relative px-4 lg:px-0 pt-8 pb-8"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

export default HeroSection;
