"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Star, Users } from "lucide-react";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button, Input } from "@/components/ui";
import { signUpAction } from "@/lib/actions/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

const stats = [
  { value: "10.000+", label: "Pengguna Aktif" },
  { value: "150rb+", label: "Invoice Dibuat" },
  { value: "4.9★", label: "Rating Pengguna" },
];

function LeftPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-400 p-12 lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">InvoiceKu</span>
        </div>
        <p className="max-w-xs text-base leading-relaxed text-indigo-100">
          Platform manajemen invoice terpercaya untuk freelancer dan bisnis Indonesia.
        </p>
      </div>

      <div className="relative z-10 my-8 flex flex-1 flex-col justify-center space-y-8">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-200" />
            <span className="text-sm font-medium text-indigo-100">Bergabung dengan</span>
          </div>
          <p className="text-4xl font-bold leading-tight text-white">10.000+</p>
          <p className="text-lg font-medium text-indigo-100">pengguna InvoiceKu</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-xl border border-white/20 bg-white/15 p-3 text-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold leading-none text-white">{value}</p>
              <p className="mt-1 text-xs text-indigo-200">{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300"
              />
            ))}
          </div>
          <p className="mb-4 text-sm italic leading-relaxed text-white">
            &ldquo;InvoiceKu benar-benar mengubah cara saya mengelola keuangan freelance.
            Sekarang klien bayar lebih cepat dan saya bisa fokus ke pekerjaan.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Andi Setiawan</p>
              <p className="text-xs text-indigo-200">Freelance Designer, Jakarta</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-2">
        {[
          "Gratis selamanya untuk 5 invoice/bulan",
          "Tidak perlu kartu kredit untuk mendaftar",
          "Setup dalam 2 menit",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-300" />
            <span className="text-sm text-indigo-100">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const steps = ["Akun", "Profil", "Selesai"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8 flex items-center gap-0">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === current;
        const isDone = stepNumber < current;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300",
                  isActive
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                    : isDone
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-400",
                ].join(" ")}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : stepNumber}
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
            {index < steps.length - 1 ? (
              <div
                className={[
                  "mx-1 mb-4 h-0.5 flex-1 transition-all duration-300",
                  isDone ? "bg-emerald-400" : "bg-slate-200",
                ].join(" ")}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await signUpAction(values);

      if (!result.success) {
        setErrors(result.errors ?? {});
        return;
      }

      setErrors({});
      router.push(result.redirectTo || "/onboarding");
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.general ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.general}
        </div>
      ) : null}

      <Input
        label="Nama Lengkap"
        id="register-name"
        type="text"
        placeholder="Masukkan nama lengkap Anda"
        value={values.fullName}
        onChange={(event) => {
          setValues((current) => ({ ...current, fullName: event.target.value }));
          setErrors((current) => ({ ...current, fullName: "", general: "" }));
        }}
        error={errors.fullName}
        required
        autoComplete="name"
        disabled={isPending}
      />

      <Input
        label="Email"
        id="register-email"
        type="email"
        placeholder="nama@email.com"
        value={values.email}
        onChange={(event) => {
          setValues((current) => ({ ...current, email: event.target.value }));
          setErrors((current) => ({ ...current, email: "", general: "" }));
        }}
        error={errors.email}
        required
        autoComplete="email"
        disabled={isPending}
      />

      <div className="space-y-2">
        <PasswordInput
          label="Password"
          id="register-password"
          placeholder="Minimal 8 karakter"
          value={values.password}
          onChange={(event) => {
            setValues((current) => ({ ...current, password: event.target.value }));
            setErrors((current) => ({ ...current, password: "", general: "" }));
          }}
          error={errors.password}
          required
          autoComplete="new-password"
          disabled={isPending}
        />
        <PasswordStrength password={values.password} />
      </div>

      <PasswordInput
        label="Konfirmasi Password"
        id="register-confirm-password"
        placeholder="Ulangi password Anda"
        value={values.confirmPassword}
        onChange={(event) => {
          setValues((current) => ({
            ...current,
            confirmPassword: event.target.value,
          }));
          setErrors((current) => ({
            ...current,
            confirmPassword: "",
            general: "",
          }));
        }}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
        disabled={isPending}
      />

      <div className="space-y-1">
        <label className="group flex cursor-pointer select-none items-start gap-2.5">
          <input
            type="checkbox"
            checked={values.agreeTerms}
            onChange={(event) => {
              setValues((current) => ({
                ...current,
                agreeTerms: event.target.checked,
              }));
              setErrors((current) => ({ ...current, agreeTerms: "" }));
            }}
            disabled={isPending}
            className={[
              "mt-0.5 h-4 w-4 flex-shrink-0 rounded border-2 accent-indigo-600",
              errors.agreeTerms ? "border-red-400" : "border-slate-300",
            ].join(" ")}
          />
          <span className="text-sm leading-relaxed text-slate-600">
            Saya setuju dengan{" "}
            <Link
              href="/terms"
              className="font-medium text-indigo-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="font-medium text-indigo-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>{" "}
            InvoiceKu.
          </span>
        </label>
        {errors.agreeTerms ? (
          <p className="ml-6 text-xs text-red-600">{errors.agreeTerms}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isPending}
        className="mt-2 w-full"
      >
        Daftar Sekarang
      </Button>
    </form>
  );
}

export default function RegisterPage() {
  const [oauthError, setOauthError] = useState("");

  async function handleGoogleSignUp() {
    setOauthError("");
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      setOauthError(error.message);
    }
  }

  return (
    <div className="flex min-h-screen">
      <LeftPanel />

      <div className="flex flex-1 items-start justify-center overflow-y-auto bg-white px-6 py-12 sm:px-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">InvoiceKu</span>
          </div>

          <StepIndicator current={1} />

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Buat Akun Gratis</h1>
            <p className="mt-2 text-sm text-slate-500">
              Mulai kelola invoice Anda secara profesional hari ini.
            </p>
          </div>

          <GoogleOAuthButton onClick={handleGoogleSignUp} />
          {oauthError ? <p className="mt-3 text-sm text-red-600">{oauthError}</p> : null}

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="whitespace-nowrap text-xs font-medium text-slate-400">
              atau lanjutkan dengan email
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
            >
              Masuk
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
