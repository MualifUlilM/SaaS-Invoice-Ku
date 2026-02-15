"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "Apakah ada masa trial untuk paket Pro?",
    answer:
      "Ya! Paket Pro tersedia dengan masa trial gratis 14 hari penuh. Anda dapat menggunakan semua fitur Pro tanpa perlu memasukkan kartu kredit. Setelah 14 hari, Anda bisa memilih untuk berlangganan atau kembali ke paket Free.",
  },
  {
    question: "Bagaimana cara pembayaran berlangganan?",
    answer:
      "Kami menerima berbagai metode pembayaran: transfer bank (BCA, Mandiri, BNI, BRI), virtual account, QRIS, kartu kredit/debit Visa & Mastercard, serta dompet digital (GoPay, OVO, Dana). Pembayaran dapat dilakukan bulanan atau tahunan.",
  },
  {
    question: "Apakah saya bisa cancel langganan kapan saja?",
    answer:
      "Tentu. Tidak ada kontrak jangka panjang. Anda dapat membatalkan langganan kapan saja langsung dari pengaturan akun. Setelah cancel, akun Anda tetap aktif hingga akhir periode yang sudah dibayar. Data Anda tetap tersimpan selama 90 hari setelah masa aktif berakhir.",
  },
  {
    question: "Apakah data saya aman di InvoiceKu?",
    answer:
      "Keamanan data adalah prioritas kami. Seluruh data dienkripsi menggunakan TLS 1.3 saat transit dan AES-256 saat tersimpan. Server kami berlokasi di Indonesia dan memenuhi standar ISO 27001. Kami tidak pernah menjual atau berbagi data Anda kepada pihak ketiga.",
  },
  {
    question: "Bisakah saya upgrade atau downgrade paket?",
    answer:
      "Ya, Anda dapat upgrade atau downgrade paket kapan saja. Saat upgrade, Anda hanya membayar selisih harga secara prorated (dihitung per hari). Saat downgrade, kredit yang tersisa akan digunakan untuk periode berikutnya.",
  },
  {
    question: "Apakah ada diskon untuk NGO atau startup early-stage?",
    answer:
      "Ya! Kami menyediakan program khusus untuk NGO/lembaga nirlaba (diskon 50%) dan startup early-stage yang terdaftar di inkubator/akselerator terkemuka (diskon 30%). Hubungi tim kami di hello@invoiceku.id dengan menyertakan bukti kelembagaan Anda.",
  },
  {
    question: "Apa yang terjadi jika saya melebihi limit di paket Free?",
    answer:
      "Jika Anda mencapai batas 5 invoice di paket Free, Anda tidak bisa membuat invoice baru sampai bulan berikutnya atau hingga upgrade ke paket Pro. Invoice yang sudah dibuat sebelumnya tetap aktif dan dapat diakses. Kami akan mengirimkan notifikasi saat Anda mendekati limit.",
  },
  {
    question: "Apakah ada biaya tersembunyi?",
    answer:
      "Sama sekali tidak. Harga yang tertera sudah final. Tidak ada biaya setup, biaya per transaksi, biaya storage tambahan, atau biaya lainnya yang tidak disebutkan. Jika ada perubahan harga di masa depan, Anda akan mendapat pemberitahuan minimal 30 hari sebelumnya, dan harga lama tetap berlaku untuk langganan aktif.",
  },
];

// ─── ACCORDION ITEM ───────────────────────────────────────────────────────────

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={[
        "rounded-xl border transition-colors duration-200",
        isOpen
          ? "border-indigo-200 bg-indigo-50/40"
          : "border-slate-200 bg-white hover:border-slate-300",
      ].join(" ")}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={[
            "text-base font-semibold transition-colors",
            isOpen ? "text-indigo-700" : "text-slate-800",
          ].join(" ")}
        >
          {faq.question}
        </span>
        <span
          className={[
            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors",
            isOpen
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-500",
          ].join(" ")}
        >
          {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper id="faq" background="gray">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
          >
            FAQ Harga &amp; Pembayaran
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500"
          >
            Pertanyaan umum seputar paket dan pembayaran InvoiceKu.
          </motion.p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-slate-400 text-sm mt-10"
        >
          Masih ada pertanyaan?{" "}
          <a
            href="mailto:hello@invoiceku.id"
            className="text-indigo-600 font-medium hover:underline"
          >
            Kirim email ke kami
          </a>
          {" "}atau{" "}
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-medium hover:underline"
          >
            chat via WhatsApp
          </a>
          .
        </motion.p>
      </div>
    </SectionWrapper>
  );
}

export default PricingFAQ;
