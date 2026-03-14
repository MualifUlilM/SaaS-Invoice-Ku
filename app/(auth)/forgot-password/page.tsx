"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { requestPasswordResetAction } from "@/lib/actions/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    startTransition(async () => {
      const result = await requestPasswordResetAction({
        email,
        origin: window.location.origin,
      });

      if (!result.success) {
        setError(result.errors?.email || result.errors?.general || "");
        return;
      }

      setMessage(result.message || "");
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
            Reset Password
          </p>
          <h1 className="mt-4 text-3xl font-bold">Akses akun Anda kembali.</h1>
          <p className="mt-4 text-base text-slate-300">
            Masukkan email akun InvoiceKu Anda. Kami akan kirim tautan aman untuk
            mengatur password baru.
          </p>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="font-semibold">Aman dan cepat</p>
                <p className="mt-1 text-sm text-slate-300">
                  Tautan reset akan membawa Anda ke halaman pembaruan password yang
                  terautentikasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Kembali ke login
          </Link>

          <div className="mt-8">
            <h2 className="text-3xl font-bold text-slate-900">Lupa password</h2>
            <p className="mt-3 text-sm text-slate-500">
              Kami akan kirim tautan reset ke email Anda.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Input
              label="Email"
              id="forgot-password-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              leftIcon={<Mail size={16} />}
              error={error}
              disabled={isPending}
              required
            />

            {message ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {message}
              </div>
            ) : null}

            <Button type="submit" variant="primary" size="lg" isLoading={isPending} className="w-full">
              Kirim Link Reset
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
