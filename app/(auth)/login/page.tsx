"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, TrendingUp, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { PasswordInput } from "@/components/auth/PasswordInput";

// ─── LEFT PANEL ───────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: FileText,
    title: "Buat Invoice Instan",
    desc: "Buat invoice profesional dalam hitungan detik dengan template siap pakai.",
  },
  {
    icon: TrendingUp,
    title: "Lacak Pembayaran",
    desc: "Pantau status pembayaran secara real-time dan kirim reminder otomatis.",
  },
  {
    icon: Shield,
    title: "Data Aman & Terenkripsi",
    desc: "Semua data bisnis Anda tersimpan aman dengan enkripsi tingkat enterprise.",
  },
];

// Floating invoice card mockup data
const floatingCards = [
  {
    id: "INV-2024-001",
    client: "PT Maju Bersama",
    amount: "Rp 4.500.000",
    status: "Dibayar",
    statusColor: "bg-emerald-400 text-emerald-900",
    offset: "top-8 left-4",
    rotate: "-rotate-2",
    delay: 0,
  },
  {
    id: "INV-2024-002",
    client: "CV Kreatif Studio",
    amount: "Rp 2.750.000",
    status: "Menunggu",
    statusColor: "bg-yellow-300 text-yellow-900",
    offset: "top-24 right-4",
    rotate: "rotate-2",
    delay: 0.15,
  },
  {
    id: "INV-2024-003",
    client: "Budi Santoso",
    amount: "Rp 1.200.000",
    status: "Dikirim",
    statusColor: "bg-indigo-300 text-indigo-900",
    offset: "bottom-16 left-8",
    rotate: "rotate-1",
    delay: 0.3,
  },
];

function LeftPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 flex-col justify-between p-12">
      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Top: Logo + tagline */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            InvoiceKu
          </span>
        </div>
        <p className="text-indigo-100 text-base leading-relaxed max-w-xs">
          Platform manajemen invoice terpercaya untuk freelancer dan bisnis
          Indonesia.
        </p>
      </div>

      {/* Middle: Floating invoice cards */}
      <div className="relative z-10 flex-1 my-8">
        <div className="relative h-56">
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5, ease: "easeOut" }}
              className={`absolute ${card.offset} ${card.rotate}`}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 w-52 border border-white/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-indigo-600">
                    {card.id}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card.statusColor}`}
                  >
                    {card.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-800 truncate">
                  {card.client}
                </p>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {card.amount}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom: Benefit points */}
      <div className="relative z-10 space-y-4">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mt-0.5">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="text-xs text-indigo-100 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────────────────────

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.email) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format email tidak valid.";
  }
  if (!values.password) {
    errors.password = "Password wajib diisi.";
  } else if (values.password.length < 6) {
    errors.password = "Password minimal 6 karakter.";
  }
  return errors;
}

function LoginForm() {
  const [values, setValues] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      // TODO: connect to auth provider (e.g. NextAuth, Supabase, Clerk)
      await new Promise((res) => setTimeout(res, 1500));
    } catch {
      setErrors({ general: "Terjadi kesalahan. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.general && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errors.general}
        </div>
      )}

      <Input
        label="Email"
        id="email"
        type="email"
        placeholder="nama@email.com"
        value={values.email}
        onChange={handleChange("email")}
        error={errors.email}
        required
        autoComplete="email"
        disabled={isLoading}
      />

      <div className="space-y-1">
        <PasswordInput
          label="Password"
          id="password"
          placeholder="Masukkan password"
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
          >
            Lupa password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2"
      >
        Masuk
      </Button>
    </form>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <LeftPanel />

      {/* Right panel */}
      <div className="flex flex-1 lg:w-1/2 items-center justify-center bg-white px-6 py-12 sm:px-12">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">InvoiceKu</span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Masuk ke Akun
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Selamat datang kembali! Masukkan detail akun Anda.
            </p>
          </div>

          {/* Google OAuth */}
          <GoogleOAuthButton />

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
              atau lanjutkan dengan email
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Login form */}
          <LoginForm />

          {/* Register link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
