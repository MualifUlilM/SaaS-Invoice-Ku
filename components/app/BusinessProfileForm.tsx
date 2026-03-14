"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { Button, Input } from "@/components/ui";
import {
  completeOnboardingAction,
  updateBusinessSettingsAction,
} from "@/lib/actions/business";

interface BusinessProfileFormProps {
  mode: "onboarding" | "settings";
  defaultValues?: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    province?: string | null;
    postalCode?: string | null;
    country?: string | null;
    invoicePrefix?: string | null;
    bankName?: string | null;
    bankAccountNumber?: string | null;
    bankAccountName?: string | null;
  };
}

export function BusinessProfileForm({
  mode,
  defaultValues,
}: BusinessProfileFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    name: defaultValues?.name ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    address: defaultValues?.address ?? "",
    city: defaultValues?.city ?? "",
    province: defaultValues?.province ?? "",
    postalCode: defaultValues?.postalCode ?? "",
    country: defaultValues?.country ?? "Indonesia",
    invoicePrefix: defaultValues?.invoicePrefix ?? "INV",
    bankName: defaultValues?.bankName ?? "",
    bankAccountNumber: defaultValues?.bankAccountNumber ?? "",
    bankAccountName: defaultValues?.bankAccountName ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  function updateField(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const action =
        mode === "onboarding"
          ? completeOnboardingAction
          : updateBusinessSettingsAction;
      const result = await action(values);

      if (!result.success) {
        setErrors(result.errors ?? {});
        const generalError = result.errors?.general ?? "Terjadi kesalahan.";
        setMessage({ text: generalError, type: "error" });
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
        return;
      }

      setErrors({});
      setMessage({ text: result.message ?? "Perubahan disimpan.", type: "success" });

      if (result.redirectTo) {
        router.push(result.redirectTo);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
      {/* Section header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-base font-semibold text-slate-900">
          {mode === "onboarding" ? "Profil Bisnis" : "Informasi Bisnis"}
        </h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {mode === "onboarding"
            ? "Lengkapi info bisnis Anda untuk mulai membuat invoice"
            : "Informasi bisnis yang tampil di invoice Anda."}
        </p>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nama Bisnis"
              id="business-name"
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Contoh: Studio Andalan"
              error={errors.name}
              leftIcon={<Building2 size={16} />}
              disabled={isPending}
              required
            />
            <Input
              label="Email Bisnis"
              id="business-email"
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="halo@bisnisanda.id"
              error={errors.email}
              leftIcon={<Mail size={16} />}
              disabled={isPending}
            />
            <Input
              label="Nomor Telepon"
              id="business-phone"
              value={values.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="+62 812-3456-7890"
              error={errors.phone}
              leftIcon={<Phone size={16} />}
              disabled={isPending}
            />
            <Input
              label="Prefix Invoice"
              id="business-prefix"
              value={values.invoicePrefix}
              onChange={(event) =>
                updateField("invoicePrefix", event.target.value.toUpperCase())
              }
              placeholder="INV"
              error={errors.invoicePrefix}
              helperText="Contoh: INV, FAKTUR"
              disabled={isPending}
              required
            />
            <Input
              label="Kota"
              id="business-city"
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Jakarta"
              error={errors.city}
              leftIcon={<MapPin size={16} />}
              disabled={isPending}
            />
            <Input
              label="Provinsi"
              id="business-province"
              value={values.province}
              onChange={(event) => updateField("province", event.target.value)}
              placeholder="DKI Jakarta"
              error={errors.province}
              disabled={isPending}
            />
            <Input
              label="Kode Pos"
              id="business-postal-code"
              value={values.postalCode}
              onChange={(event) => updateField("postalCode", event.target.value)}
              placeholder="12345"
              error={errors.postalCode}
              disabled={isPending}
            />
            <Input
              label="Negara"
              id="business-country"
              value={values.country}
              onChange={(event) => updateField("country", event.target.value)}
              placeholder="Indonesia"
              error={errors.country}
              disabled={isPending}
              required
            />

            {/* Address textarea spans full width */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label htmlFor="business-address" className="text-sm font-medium text-slate-700">
                Alamat Bisnis
              </label>
              <textarea
                id="business-address"
                rows={4}
                value={values.address}
                onChange={(event) => updateField("address", event.target.value)}
                placeholder="Alamat lengkap bisnis Anda"
                disabled={isPending}
                className={[
                  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500",
                  "transition-all duration-200",
                  errors.address ? "border-red-400" : "border-slate-200 hover:border-slate-400",
                  isPending ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "",
                ].join(" ")}
              />
              {errors.address ? (
                <p className="text-xs text-red-600">{errors.address}</p>
              ) : null}
            </div>
          </div>

          {/* Info Pembayaran section */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-900">Info Rekening Pembayaran</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Akan otomatis tampil sebagai instruksi pembayaran di invoice baru.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nama Bank"
                id="bank-name"
                value={values.bankName}
                onChange={(e) => updateField("bankName", e.target.value)}
                placeholder="BCA, Mandiri, BRI..."
                error={errors.bankName}
                disabled={isPending}
              />
              <Input
                label="Nomor Rekening"
                id="bank-account-number"
                value={values.bankAccountNumber}
                onChange={(e) => updateField("bankAccountNumber", e.target.value)}
                placeholder="1234567890"
                error={errors.bankAccountNumber}
                disabled={isPending}
              />
              <Input
                label="Nama Pemilik Rekening"
                id="bank-account-name"
                value={values.bankAccountName}
                onChange={(e) => updateField("bankAccountName", e.target.value)}
                placeholder="PT. Nama Bisnis Anda"
                error={errors.bankAccountName}
                disabled={isPending}
              />
            </div>
          </div>

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
          <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
            {mode === "onboarding" ? "Masuk ke Dashboard" : "Simpan Profil Bisnis"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BusinessProfileForm;
