"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/layout";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    initials: "AR",
    name: "Andi Rahmawan",
    role: "Freelance Web Developer",
    city: "Bandung",
    rating: 5,
    text: "Dulu makan waktu 30 menit buat bikin invoice di Word. Sekarang pakai InvoiceKu cuma 3 menit. Klien saya juga lebih cepat bayar karena ada link pembayaran langsung.",
    avatarColor: "bg-indigo-100 text-indigo-700",
  },
  {
    initials: "SN",
    name: "Siti Nurhaliza",
    role: "Pemilik Butik Online",
    city: "Surabaya",
    rating: 5,
    text: "Fitur reminder otomatis itu juara banget! Saya nggak perlu lagi WA klien satu per satu untuk tagih hutang. Semuanya otomatis dan tetap terlihat profesional.",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
  {
    initials: "BH",
    name: "Bayu Hermawan",
    role: "Konsultan Marketing",
    city: "Jakarta",
    rating: 5,
    text: "Laporan keuangannya sangat membantu untuk laporan ke klien korporat. Tampilan dashboard-nya juga bersih dan intuitif, tidak perlu belajar lama.",
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    initials: "DF",
    name: "Dewi Fitriani",
    role: "Fotografer Pernikahan",
    city: "Yogyakarta",
    rating: 5,
    text: "Saya freelancer yang nggak jago akuntansi, tapi InvoiceKu bikin semua terasa mudah. Multi klien sangat membantu karena saya handle banyak project sekaligus.",
    avatarColor: "bg-rose-100 text-rose-700",
  },
  {
    initials: "RP",
    name: "Rizky Pratama",
    role: "Owner CV Kreatif Digital",
    city: "Medan",
    rating: 5,
    text: "Setelah pakai InvoiceKu, overdue invoice turun dari 40% ke 8%. Tim keuangan kami jadi lebih produktif karena tidak perlu follow-up manual setiap hari.",
    avatarColor: "bg-sky-100 text-sky-700",
  },
  {
    initials: "YA",
    name: "Yuni Astuti",
    role: "Desainer Grafis",
    city: "Bali",
    rating: 5,
    text: "Fitur kirim via WhatsApp itu game changer! Klien saya yang kurang familier email jadi lebih mudah terima dan bayar invoice. Jumlah invoice terbayar naik signifikan.",
    avatarColor: "bg-amber-100 text-amber-700",
  },
];

// ─── STAR RATING ──────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "text-amber-400 fill-amber-400" : "text-slate-200"}
        />
      ))}
    </div>
  );
}

// ─── TESTIMONIAL CARD ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4"
    >
      <StarRating count={testimonial.rating} />

      <p className="text-sm text-slate-600 leading-relaxed flex-1">"{testimonial.text}"</p>

      <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${testimonial.avatarColor}`}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{testimonial.name}</p>
          <p className="text-xs text-slate-400">
            {testimonial.role} · {testimonial.city}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimoni" background="white">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">Testimoni</p>
        <h2 className="mb-4">Kata Mereka</h2>
        <p className="text-slate-500 max-w-lg mx-auto">
          Ribuan freelancer dan pemilik usaha kecil sudah merasakan manfaat InvoiceKu setiap harinya.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default TestimonialsSection;
