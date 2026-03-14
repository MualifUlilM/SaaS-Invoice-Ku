"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { updateAccountSettingsAction } from "@/lib/actions/business";
import { updatePasswordAction } from "@/lib/actions/auth";

interface AccountSettingsFormProps {
  defaultValues: {
    fullName?: string | null;
    phone?: string | null;
    email?: string | null;
  };
}

export function AccountSettingsForm({ defaultValues }: AccountSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    fullName: defaultValues.fullName ?? "",
    phone: defaultValues.phone ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [isPasswordPending, startPasswordTransition] = useTransition();
  const [passwordValues, setPasswordValues] = useState({ password: "", confirmPassword: "" });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [passwordMessage, setPasswordMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fullName = values.fullName || defaultValues.fullName || "";
  const email = defaultValues.email ?? "";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const result = await updateAccountSettingsAction(values);

      if (!result.success) {
        setErrors(result.errors ?? {});
        const generalError = result.errors?.general ?? "Terjadi kesalahan.";
        setMessage({ text: generalError, type: "error" });
        return;
      }

      setErrors({});
      setMessage({ text: result.message ?? "Perubahan disimpan.", type: "success" });
      router.refresh();
    });
  }

  function handlePasswordSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordMessage(null);

    startPasswordTransition(async () => {
      const result = await updatePasswordAction(passwordValues);

      if (!result.success) {
        setPasswordErrors(result.errors ?? {});
        setPasswordMessage({ text: result.errors?.general ?? "Terjadi kesalahan.", type: "error" });
        return;
      }

      setPasswordErrors({});
      setPasswordValues({ password: "", confirmPassword: "" });
      setPasswordMessage({ text: result.message ?? "Password berhasil diperbarui.", type: "success" });
    });
  }

  return (
    <div className="space-y-6">
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Section header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">Informasi Akun</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Kelola nama pemilik akun dan kontak yang dipakai untuk histori aktivitas.
        </p>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          {/* Avatar placeholder */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-semibold">
              {initials || "?"}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{fullName || "—"}</p>
              <p className="text-xs text-slate-500">{email}</p>
            </div>
          </div>

          <Input
            label="Nama Lengkap"
            id="account-full-name"
            value={values.fullName}
            onChange={(event) => {
              setValues((current) => ({ ...current, fullName: event.target.value }));
              setErrors((current) => ({ ...current, fullName: "" }));
            }}
            error={errors.fullName}
            disabled={isPending}
            required
          />

          <Input
            label="Nomor Telepon"
            id="account-phone"
            value={values.phone}
            onChange={(event) => {
              setValues((current) => ({ ...current, phone: event.target.value }));
              setErrors((current) => ({ ...current, phone: "" }));
            }}
            error={errors.phone}
            disabled={isPending}
          />

          {/* Email — read-only, can't be changed */}
          <Input
            label="Email"
            id="account-email"
            value={email}
            disabled
            helperText="Email mengikuti akun autentikasi dan tidak dapat diubah di sini."
          />

          {message ? (
            <p
              className={[
                "mt-4 text-sm",
                message.type === "success" ? "text-emerald-600" : "text-red-600",
              ].join(" ")}
            >
              {message.text}
            </p>
          ) : null}
        </div>

        {/* Footer / submit */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isPending}>
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </div>

    {/* Password change card */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">Ganti Password</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Buat password baru yang kuat dan belum pernah digunakan.
        </p>
      </div>
      <form onSubmit={handlePasswordSubmit}>
        <div className="p-6 space-y-4">
          <Input
            label="Password Baru"
            id="new-password"
            type="password"
            value={passwordValues.password}
            onChange={(event) => {
              setPasswordValues((current) => ({ ...current, password: event.target.value }));
              setPasswordErrors((current) => ({ ...current, password: "" }));
            }}
            error={passwordErrors.password}
            disabled={isPasswordPending}
            required
          />
          <Input
            label="Konfirmasi Password"
            id="confirm-password"
            type="password"
            value={passwordValues.confirmPassword}
            onChange={(event) => {
              setPasswordValues((current) => ({ ...current, confirmPassword: event.target.value }));
              setPasswordErrors((current) => ({ ...current, confirmPassword: "" }));
            }}
            error={passwordErrors.confirmPassword}
            disabled={isPasswordPending}
            required
          />
          {passwordMessage && (
            <p className={`text-sm ${passwordMessage.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
              {passwordMessage.text}
            </p>
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isPasswordPending}>
            Perbarui Password
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AccountSettingsForm;
