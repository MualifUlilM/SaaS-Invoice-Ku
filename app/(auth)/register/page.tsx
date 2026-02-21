"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui";
import { Input } from "@/components/ui";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";

// ─── LEFT PANEL ───────────────────────────────────────────────────────────────

const stats = [
  { value: "10.000+", label: "Pengguna Aktif" },
  { value: "150rb+", label: "Invoice Dibuat" },
  { value: "4.9★", label: "Rating Pengguna" },
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

      {/* Top: Logo */}
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

      {/* Middle: Social proof */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-8 space-y-8">
        {/* Heading */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-indigo-200" />
            <span className="text-indigo-100 text-sm font-medium">
              Bergabung dengan
            </span>
          </div>
          <p className="text-4xl font-bold text-white leading-tight">
            10.000+
          </p>
          <p className="text-indigo-100 text-lg font-medium">
            pengguna InvoiceKu
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20"
            >
              <p className="text-white font-bold text-lg leading-none">
                {value}
              </p>
              <p className="text-indigo-200 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <p className="text-white text-sm leading-relaxed mb-4 italic">
            &ldquo;InvoiceKu benar-benar mengubah cara saya mengelola keuangan
            freelance. Sekarang klien bayar lebih cepat dan saya bisa fokus ke
            pekerjaan.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            {/* Avatar with initials */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
              AS
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Andi Setiawan</p>
              <p className="text-indigo-200 text-xs">
                Freelance Designer, Jakarta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Benefit list */}
      <div className="relative z-10 space-y-2">
        {[
          "Gratis selamanya untuk 5 invoice/bulan",
          "Tidak perlu kartu kredit untuk mendaftar",
          "Setup dalam 2 menit",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span className="text-indigo-100 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROGRESS INDICATOR ───────────────────────────────────────────────────────

const steps = ["Akun", "Profil", "Selesai"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  isActive
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : isDone
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-400",
                ].join(" ")}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={[
                  "text-xs font-medium",
                  isActive
                    ? "text-indigo-600"
                    : isDone
                    ? "text-emerald-600"
                    : "text-slate-400",
                ].join(" ")}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={[
                  "flex-1 h-0.5 mx-1 mb-4 transition-all duration-300",
                  isDone ? "bg-emerald-400" : "bg-slate-200",
                ].join(" ")}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── REGISTER FORM ────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
  general?: string;
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Nama lengkap wajib diisi.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Nama minimal 2 karakter.";
  }

  if (!values.email) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format email tidak valid.";
  }

  if (!values.password) {
    errors.password = "Password wajib diisi.";
  } else if (values.password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Konfirmasi password wajib diisi.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password tidak cocok.";
  }

  if (!values.agreeTerms) {
    errors.agreeTerms = "Anda harus menyetujui Terms of Service.";
  }

  return errors;
}

function RegisterForm() {
  const [values, setValues] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange =
    (field: keyof Omit<FormState, "agreeTerms">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (submitted) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, agreeTerms: e.target.checked }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, agreeTerms: undefined }));
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
        label="Nama Lengkap"
        id="name"
        type="text"
        placeholder="Masukkan nama lengkap Anda"
        value={values.name}
        onChange={handleChange("name")}
        error={errors.name}
        required
        autoComplete="name"
        disabled={isLoading}
      />

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

      <div className="space-y-2">
        <PasswordInput
          label="Password"
          id="password"
          placeholder="Minimal 8 karakter"
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password}
          required
          autoComplete="new-password"
          disabled={isLoading}
        />
        <PasswordStrength password={values.password} />
      </div>

      <PasswordInput
        label="Konfirmasi Password"
        id="confirm-password"
        placeholder="Ulangi password Anda"
        value={values.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
        disabled={isLoading}
      />

      {/* Terms checkbox */}
      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer select-none group">
          <input
            type="checkbox"
            checked={values.agreeTerms}
            onChange={handleCheckbox}
            disabled={isLoading}
            className={[
              "mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0",
              "accent-indigo-600 cursor-pointer",
              errors.agreeTerms ? "border-red-400" : "border-slate-300",
            ].join(" ")}
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            Saya setuju dengan{" "}
            <Link
              href="/terms"
              className="text-indigo-600 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="text-indigo-600 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>{" "}
            InvoiceKu.
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="text-xs text-red-600 ml-6" role="alert">
            {errors.agreeTerms}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full mt-2"
      >
        Daftar Sekarang
      </Button>
    </form>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <LeftPanel />

      {/* Right panel */}
      <div className="flex flex-1 lg:w-1/2 items-start justify-center bg-white px-6 py-12 sm:px-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
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

          {/* Step indicator */}
          <StepIndicator current={1} />

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Buat Akun Gratis
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Mulai kelola invoice Anda secara profesional hari ini.
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

          {/* Register form */}
          <RegisterForm />

          {/* Login link */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              Masuk
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
