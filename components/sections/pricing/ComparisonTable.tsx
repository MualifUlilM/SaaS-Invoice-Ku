"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CellValue = boolean | string;

interface FeatureRow {
  category?: string; // renders as a category sub-header row
  label?: string;
  free?: CellValue;
  pro?: CellValue;
  enterprise?: CellValue;
}

// ─── DATA ──────────────────────────────────────────────────────────────────────

const rows: FeatureRow[] = [
  // ── Pembuatan Invoice
  { category: "Pembuatan Invoice" },
  { label: "Jumlah invoice per bulan",    free: "5",           pro: "Unlimited",  enterprise: "Unlimited" },
  { label: "Jumlah klien",                free: "1",           pro: "Unlimited",  enterprise: "Unlimited" },
  { label: "Template invoice",            free: "1 (dasar)",   pro: "20+",        enterprise: "Custom" },
  { label: "Logo & branding sendiri",     free: false,         pro: true,         enterprise: true },
  { label: "Nomor invoice otomatis",      free: true,          pro: true,         enterprise: true },
  { label: "Multi mata uang",             free: false,         pro: true,         enterprise: true },
  { label: "Tanda tangan digital",        free: false,         pro: true,         enterprise: true },

  // ── Pembayaran
  { category: "Pembayaran" },
  { label: "Link pembayaran online",      free: false,         pro: true,         enterprise: true },
  { label: "Integrasi payment gateway",   free: false,         pro: true,         enterprise: true },
  { label: "Reminder pembayaran otomatis",free: false,         pro: true,         enterprise: true },
  { label: "Partial payment",            free: false,         pro: true,         enterprise: true },

  // ── Laporan & Analitik
  { category: "Laporan & Analitik" },
  { label: "Dashboard ringkasan",         free: true,          pro: true,         enterprise: true },
  { label: "Laporan keuangan bulanan",    free: false,         pro: true,         enterprise: true },
  { label: "Laporan laba-rugi",           free: false,         pro: true,         enterprise: true },
  { label: "Export PDF / Excel",          free: "PDF saja",    pro: true,         enterprise: true },
  { label: "Analitik lanjutan",           free: false,         pro: false,        enterprise: true },

  // ── Tim & Kolaborasi
  { category: "Tim & Kolaborasi" },
  { label: "Jumlah pengguna",             free: "1",           pro: "1",          enterprise: "Unlimited" },
  { label: "Role & permission tim",       free: false,         pro: false,        enterprise: true },
  { label: "Activity log tim",            free: false,         pro: false,        enterprise: true },

  // ── Integrasi & API
  { category: "Integrasi & API" },
  { label: "Integrasi akuntansi",         free: false,         pro: true,         enterprise: true },
  { label: "REST API access",             free: false,         pro: false,        enterprise: true },
  { label: "Webhook",                     free: false,         pro: false,        enterprise: true },
  { label: "White label / custom domain", free: false,         pro: false,        enterprise: true },

  // ── Dukungan
  { category: "Dukungan" },
  { label: "Email support",               free: true,          pro: true,         enterprise: true },
  { label: "Priority support",            free: false,         pro: true,         enterprise: true },
  { label: "Dedicated account manager",   free: false,         pro: false,        enterprise: true },
  { label: "Onboarding & pelatihan",      free: false,         pro: false,        enterprise: true },
  { label: "SLA 99.9% uptime",           free: false,         pro: false,        enterprise: true },
];

// ─── CELL RENDERER ────────────────────────────────────────────────────────────

function CellIcon({ value }: { value: CellValue }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50">
        <Check size={13} className="text-emerald-600" strokeWidth={3} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100">
        <X size={13} className="text-slate-400" strokeWidth={2.5} />
      </span>
    );
  }
  // string value
  return (
    <span className="text-sm font-medium text-slate-700">{value}</span>
  );
}

// ─── ROW ANIMATION ────────────────────────────────────────────────────────────

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.03, ease: "easeOut" as const },
  }),
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function ComparisonTable() {
  let featureIndex = 0;

  return (
    <SectionWrapper id="comparison" background="white">
      {/* Section header */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
        >
          Perbandingan Fitur Lengkap
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-500 max-w-xl mx-auto"
        >
          Cek detail setiap fitur sebelum memutuskan paket yang paling sesuai.
        </motion.p>
      </div>

      {/* Table container with horizontal scroll on mobile */}
      <div className="relative">
        {/* Left shadow for horizontal scroll indicator */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-20
            bg-gradient-to-r from-white to-transparent md:hidden"
        />
        {/* Right shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-20
            bg-gradient-to-l from-white to-transparent md:hidden"
        />

        <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
          <table className="w-full min-w-[680px] border-collapse">
            {/* ── Sticky header ── */}
            <thead className="sticky top-16 z-10 bg-white shadow-sm">
              <tr>
                <th className="py-4 px-5 text-left text-sm font-semibold text-slate-500 w-1/2 border-b border-slate-200">
                  Fitur
                </th>
                <th className="py-4 px-5 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">
                  Free
                </th>
                <th className="py-4 px-5 text-center border-b-2 border-indigo-500 bg-indigo-50/60">
                  <span className="text-sm font-bold text-indigo-700">Pro</span>
                  <span className="block text-xs font-normal text-indigo-400 mt-0.5">
                    Paling Populer
                  </span>
                </th>
                <th className="py-4 px-5 text-center text-sm font-semibold text-slate-700 border-b border-slate-200">
                  Enterprise
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIdx) => {
                // Category sub-header
                if (row.category) {
                  return (
                    <tr key={`cat-${rowIdx}`} className="bg-slate-50">
                      <td
                        colSpan={4}
                        className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400"
                      >
                        {row.category}
                      </td>
                    </tr>
                  );
                }

                const fi = featureIndex++;
                return (
                  <motion.tr
                    key={`row-${rowIdx}`}
                    custom={fi}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="py-3.5 px-5 text-sm text-slate-700">
                      {row.label}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.free!} />
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center bg-indigo-50/30 border-x border-indigo-100/60">
                      <div className="flex justify-center">
                        <CellIcon value={row.pro!} />
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={row.enterprise!} />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 mt-8 justify-center text-sm text-slate-500">
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50">
            <Check size={11} className="text-emerald-600" strokeWidth={3} />
          </span>
          Tersedia
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100">
            <X size={11} className="text-slate-400" strokeWidth={2.5} />
          </span>
          Tidak tersedia
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200">
            <Minus size={11} className="text-slate-400" strokeWidth={2.5} />
          </span>
          Nilai spesifik
        </span>
      </div>
    </SectionWrapper>
  );
}

export default ComparisonTable;
