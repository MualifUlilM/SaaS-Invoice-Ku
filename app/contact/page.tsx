"use client";

import type { Metadata } from "next";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { SectionWrapper } from "@/components/layout";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";

// ─── CONTACT INFO ──────────────────────────────────────────────────────────────

const contactItems = [
  {
    icon: Mail,
    color: "bg-indigo-100 text-indigo-600",
    title: "Email",
    value: "halo@invoiceku.id",
    description: "Balas dalam 1–2 hari kerja",
    href: "mailto:halo@invoiceku.id",
  },
  {
    icon: MessageCircle,
    color: "bg-emerald-100 text-emerald-600",
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    description: "Senin–Jumat, 09.00–17.00 WIB",
    href: "https://wa.me/6281234567890",
  },
  {
    icon: MapPin,
    color: "bg-violet-100 text-violet-600",
    title: "Alamat",
    value: "Jakarta Selatan, Indonesia",
    description: "PT InvoiceKu Teknologi Indonesia",
    href: "#",
  },
  {
    icon: Clock,
    color: "bg-amber-100 text-amber-600",
    title: "Jam Operasional",
    value: "Senin – Jumat",
    description: "09.00 – 17.00 WIB",
    href: "#",
  },
];

// ─── TOPICS ────────────────────────────────────────────────────────────────────

const topics = [
  "Pertanyaan umum",
  "Masalah teknis",
  "Billing & pembayaran",
  "Kemitraan / Enterprise",
  "Lainnya",
];

// ─── FORM ──────────────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

function ContactForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: FormState): Partial<FormState> => {
    const e: Partial<FormState> = {};
    if (!v.name.trim()) e.name = "Nama wajib diisi";
    if (!v.email.trim()) e.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
      e.email = "Format email tidak valid";
    if (!v.topic) e.topic = "Pilih topik pertanyaan";
    if (!v.message.trim()) e.message = "Pesan wajib diisi";
    else if (v.message.trim().length < 20)
      e.message = "Pesan minimal 20 karakter";
    return e;
  };

  const handleChange =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Pesan Terkirim!
          </h3>
          <p className="text-slate-500 max-w-sm">
            Terima kasih telah menghubungi kami. Tim kami akan membalas pesan
            Anda dalam 1–2 hari kerja.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setValues({ name: "", email: "", topic: "", message: "" });
          }}
          className="text-sm text-indigo-600 font-medium hover:text-indigo-700 underline underline-offset-4"
        >
          Kirim pesan lain
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Nama Lengkap"
          id="name"
          type="text"
          placeholder="Budi Santoso"
          value={values.name}
          onChange={handleChange("name")}
          error={errors.name}
        />
        <Input
          label="Alamat Email"
          id="email"
          type="email"
          placeholder="budi@email.com"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
        />
      </div>

      {/* Topic select */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="topic" className="text-sm font-medium text-slate-700">
          Topik Pertanyaan
        </label>
        <select
          id="topic"
          value={values.topic}
          onChange={handleChange("topic")}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm bg-white",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
            "transition-colors duration-200",
            errors.topic
              ? "border-red-400 text-red-900"
              : "border-slate-300 text-slate-900 hover:border-slate-400",
          ].join(" ")}
        >
          <option value="">Pilih topik...</option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.topic && <p className="text-xs text-red-600">{errors.topic}</p>}
      </div>

      {/* Message textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-slate-700">
          Pesan
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Ceritakan pertanyaan atau masalah Anda..."
          value={values.message}
          onChange={handleChange("message")}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm resize-y",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1",
            "transition-colors duration-200",
            errors.message
              ? "border-red-400 text-red-900 placeholder:text-red-300"
              : "border-slate-300 text-slate-900 placeholder:text-slate-400 hover:border-slate-400",
          ].join(" ")}
        />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message}</p>
        )}
        <p className="text-xs text-slate-400 text-right">
          {values.message.length} karakter
        </p>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={loading}
        rightIcon={!loading ? <Send size={16} /> : undefined}
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </Button>
    </form>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <SectionWrapper background="gradient" className="pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-3">
            Hubungi Kami
          </p>
          <h1 className="text-slate-900 mb-4">
            Ada Pertanyaan?{" "}
            <span className="text-gradient">Kami Siap Membantu</span>
          </h1>
          <p className="text-lg text-slate-500">
            Tim kami siap menjawab pertanyaan Anda seputar InvoiceKu. Pilih cara
            yang paling nyaman untuk Anda.
          </p>
        </motion.div>
      </SectionWrapper>

      {/* Contact cards */}
      <SectionWrapper background="white" className="!py-0 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={
                item.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-200 transition-all duration-200 group"
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}
              >
                <item.icon size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {item.title}
                </p>
                <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.value}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </SectionWrapper>

      {/* Form + FAQ kolom */}
      <SectionWrapper background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Kirim Pesan
              </h2>
              <p className="text-slate-500 mb-8 text-sm">
                Isi formulir di bawah dan tim kami akan segera merespons.
              </p>
              <ContactForm />
            </div>
          </motion.div>

          {/* Info tambahan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <div
              className="rounded-2xl p-6 text-white"
              style={{
                background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Chat via WhatsApp
                </h3>
              </div>
              <p className="text-indigo-200 text-sm mb-4">
                Butuh jawaban cepat? Chat langsung dengan tim support kami di
                WhatsApp.
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo border border-white text-indigo-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <Phone size={15} />
                Mulai Chat
              </a>
            </div>

            {/* FAQ singkat */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Pertanyaan Umum
              </h3>
              <ul className="space-y-3">
                {[
                  [
                    "Berapa lama respons email?",
                    "1–2 hari kerja untuk email umum, prioritas 4 jam untuk pelanggan Pro.",
                  ],
                  [
                    "Ada demo produk?",
                    "Ya, jadwalkan demo gratis 30 menit dengan tim kami.",
                  ],
                  [
                    "Bagaimana jika ada bug?",
                    "Laporkan via email bugs@invoiceku.id, kami respons dalam 24 jam.",
                  ],
                ].map(([q, a]) => (
                  <li
                    key={q}
                    className="border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-slate-800 mb-1">
                      {q}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sales */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Untuk Tim & Enterprise
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Butuh solusi untuk tim besar atau integrasi khusus? Hubungi tim
                sales kami.
              </p>
              <a
                href="mailto:sales@invoiceku.id"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Mail size={15} />
                sales@invoiceku.id
              </a>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </>
  );
}
