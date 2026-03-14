"use client";

import React, { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, Shield, TrendingUp } from "lucide-react";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button, Input } from "@/components/ui";
import { signInAction } from "@/lib/actions/auth";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

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
          <span className="text-2xl font-bold tracking-tight text-white">
            InvoiceKu
          </span>
        </div>
        <p className="max-w-xs text-base leading-relaxed text-indigo-100">
          Platform manajemen invoice terpercaya untuk freelancer dan bisnis Indonesia.
        </p>
      </div>

      <div className="relative z-10 my-8 flex-1">
        <div className="relative h-56">
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5, ease: "easeOut" }}
              className={`absolute ${card.offset} ${card.rotate}`}
            >
              <div className="w-52 rounded-xl border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600">{card.id}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${card.statusColor}`}
                  >
                    {card.status}
                  </span>
                </div>
                <p className="truncate text-sm font-medium text-slate-800">{card.client}</p>
                <p className="mt-1 text-base font-bold text-slate-900">{card.amount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
              <Icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="text-xs leading-relaxed text-indigo-100">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LoginFormProps {
  onSuccess: (redirectTo: string) => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const result = await signInAction(values);

      if (!result.success) {
        setErrors(result.errors ?? {});
        return;
      }

      setErrors({});
      onSuccess(result.redirectTo || "/dashboard");
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
        label="Email"
        id="email"
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

      <div className="space-y-1">
        <PasswordInput
          label="Password"
          id="password"
          placeholder="Masukkan password"
          value={values.password}
          onChange={(event) => {
            setValues((current) => ({ ...current, password: event.target.value }));
            setErrors((current) => ({ ...current, password: "", general: "" }));
          }}
          error={errors.password}
          required
          autoComplete="current-password"
          disabled={isPending}
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
          >
            Lupa password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isPending}
        className="mt-2 w-full"
      >
        Masuk
      </Button>
    </form>
  );
}

function getLoginMessage(message: string | null) {
  if (message === "check-email") {
    return "Cek email Anda untuk verifikasi akun sebelum masuk.";
  }

  if (message === "signed-out") {
    return "Anda telah keluar dari akun.";
  }

  return "";
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [oauthError, setOauthError] = useState("");
  const infoMessage = getLoginMessage(searchParams.get("message"));

  async function handleGoogleSignIn() {
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

      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12 sm:px-12 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 32 }}
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

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Masuk ke Akun</h1>
            <p className="mt-2 text-sm text-slate-500">
              Selamat datang kembali. Masukkan detail akun Anda.
            </p>
          </div>

          {infoMessage ? (
            <div className="mb-5 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              {infoMessage}
            </div>
          ) : null}

          <GoogleOAuthButton onClick={handleGoogleSignIn} />
          {oauthError ? (
            <p className="mt-3 text-sm text-red-600">{oauthError}</p>
          ) : null}

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="whitespace-nowrap text-xs font-medium text-slate-400">
              atau lanjutkan dengan email
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <LoginForm onSuccess={(redirectTo) => router.push(redirectTo)} />

          <p className="mt-8 text-center text-sm text-slate-500">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
            >
              Daftar sekarang
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <LoginPageContent />
    </Suspense>
  );
}
