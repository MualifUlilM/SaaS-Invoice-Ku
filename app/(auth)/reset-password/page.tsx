"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { updatePasswordAction } from "@/lib/actions/auth";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setMessage("");

    startTransition(async () => {
      const result = await updatePasswordAction({
        password,
        confirmPassword,
      });

      if (!result.success) {
        setErrors(result.errors ?? {});
        setMessage(result.errors?.general ?? "");
        return;
      }

      setMessage(result.message ?? "");

      if (result.redirectTo) {
        window.location.href = result.redirectTo;
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft size={16} />
          Kembali ke login
        </Link>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Atur password baru</h1>
            <p className="mt-2 text-sm text-slate-500">
              Gunakan password yang kuat agar akun InvoiceKu Anda tetap aman.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="space-y-2">
            <PasswordInput
              label="Password Baru"
              id="reset-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              disabled={isPending}
              required
            />
            <PasswordStrength password={password} />
          </div>

          <PasswordInput
            label="Konfirmasi Password"
            id="reset-password-confirmation"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={errors.confirmPassword}
            disabled={isPending}
            required
          />

          {message ? <p className="text-sm text-indigo-600">{message}</p> : null}

          <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
            Simpan Password Baru
          </Button>
        </form>
      </div>
    </div>
  );
}
