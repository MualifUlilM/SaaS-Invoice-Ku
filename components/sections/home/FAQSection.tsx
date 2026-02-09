"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "Apakah InvoiceKu benar-benar gratis untuk paket Free?",
    answer:
      "Ya, paket Free benar-benar gratis tanpa biaya apapun. Kamu bisa membuat hingga 5 invoice per bulan, mengelola 1 klien aktif, dan mengunduh PDF invoice tanpa perlu memasukkan data kartu kredit atau rekening bank.",
  },
  {
    question: "Bagaimana cara klien saya melakukan pembayaran?",
    answer:
      "Invoice yang kamu kirim akan menyertakan link pembayaran yang bisa dibayar melalui berbagai metode seperti transfer bank, e-wallet (GoPay, OVO, DANA), hingga kartu kredit. Sistem kami terintegrasi dengan payment gateway lokal yang terpercaya.",
  },
  {
    question: "Apakah data dan invoice saya aman?",
    answer:
      "Keamanan data adalah prioritas utama kami. Semua data dienkripsi menggunakan standar AES-256 saat penyimpanan dan TLS 1.3 saat transmisi. Server kami berlokasi di Indonesia dan mematuhi regulasi perlindungan data pribadi yang berlaku.",
  },
  {
    question: "Bisa export invoice ke format apa saja?",
    answer:
      "Invoice bisa diekspor dalam format PDF berkualitas tinggi dengan branding bisnis kamu. Untuk paket Pro ke atas, tersedia juga ekspor dalam format Excel untuk keperluan pembukuan dan rekonsiliasi keuangan.",
  },
  {
    question: "Apakah InvoiceKu bisa digunakan untuk bisnis dengan banyak karyawan?",
    answer:
      "Tentu! Paket Enterprise dirancang khusus untuk tim dan perusahaan. Kamu bisa menambahkan beberapa pengguna dengan level akses berbeda (admin, editor, viewer), sehingga seluruh tim bisa berkolaborasi dalam satu akun bisnis.",
  },
  {
    question: "Bagaimana jika saya ingin berhenti berlangganan?",
    answer:
      "Kamu bisa membatalkan langganan kapan saja tanpa penalti. Akun kamu akan tetap aktif hingga akhir periode billing yang sudah dibayar. Setelah itu, akun akan otomatis beralih ke paket Free dan semua data kamu tetap bisa diakses.",
  },
];

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" as const, delay: index * 0.08 }}
      className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-slate-800 text-sm sm:text-base">{faq.question}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-slate-100">
              <p className="text-sm text-slate-500 leading-relaxed pt-4">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────────

export function FAQSection() {
  return (
    <SectionWrapper id="faq" background="white">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
        <h2 className="mb-4">Pertanyaan yang Sering Ditanya</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Tidak menemukan jawaban yang kamu cari? Hubungi tim support kami yang siap membantu.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={faq.question} faq={faq} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default FAQSection;
