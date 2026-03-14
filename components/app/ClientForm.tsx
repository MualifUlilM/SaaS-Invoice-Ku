"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import {
  createClientAction,
  updateClientAction,
} from "@/lib/actions/clients";

interface ClientFormProps {
  clientId?: string;
  title: string;
  submitLabel: string;
  defaultValues?: {
    name?: string | null;
    companyName?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    notes?: string | null;
  };
}

export function ClientForm({
  clientId,
  title,
  submitLabel,
  defaultValues,
}: ClientFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState({
    name: defaultValues?.name ?? "",
    companyName: defaultValues?.companyName ?? "",
    email: defaultValues?.email ?? "",
    phone: defaultValues?.phone ?? "",
    address: defaultValues?.address ?? "",
    notes: defaultValues?.notes ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function updateField(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);

    startTransition(async () => {
      const result = clientId
        ? await updateClientAction(clientId, values)
        : await createClientAction(values);

      if (!result.success) {
        setErrors(result.errors ?? {});
        setMessage(result.errors?.general ?? "");
        setIsSuccess(false);
        if (result.redirectTo) {
          router.push(result.redirectTo);
        }
        return;
      }

      setErrors({});
      setMessage(result.message ?? "");
      setIsSuccess(true);

      if (result.data?.id) {
        router.push(`/clients/${result.data.id}`);
        return;
      }

      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Simpan data klien agar pembuatan invoice berikutnya lebih cepat.
          </p>
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nama"
            id="client-name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            error={errors.name}
            disabled={isPending}
            required
          />
          <Input
            label="Perusahaan"
            id="client-company"
            value={values.companyName}
            onChange={(event) => updateField("companyName", event.target.value)}
            error={errors.companyName}
            disabled={isPending}
          />
          <Input
            label="Email"
            id="client-email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            error={errors.email}
            disabled={isPending}
          />
          <Input
            label="Telepon"
            id="client-phone"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            error={errors.phone}
            disabled={isPending}
          />

          {/* Address — full width */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="client-address" className="text-sm font-medium text-slate-700">
              Alamat
            </label>
            <textarea
              id="client-address"
              rows={3}
              value={values.address}
              onChange={(event) => updateField("address", event.target.value)}
              disabled={isPending}
              placeholder="Jl. Contoh No. 1, Kota, Provinsi"
              className={[
                "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                "resize-none transition-all",
                errors.address ? "border-red-400" : "border-slate-200",
                isPending ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "",
              ].join(" ")}
            />
            {errors.address ? (
              <p className="text-xs text-red-600">{errors.address}</p>
            ) : null}
          </div>

          {/* Notes — full width */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="client-notes" className="text-sm font-medium text-slate-700">
              Catatan
            </label>
            <textarea
              id="client-notes"
              rows={3}
              value={values.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              disabled={isPending}
              placeholder="Catatan tambahan tentang klien ini…"
              className={[
                "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
                "resize-none transition-all",
                errors.notes ? "border-red-400" : "border-slate-200",
                isPending ? "bg-slate-50 text-slate-400 cursor-not-allowed" : "",
              ].join(" ")}
            />
            {errors.notes ? (
              <p className="text-xs text-red-600">{errors.notes}</p>
            ) : null}
          </div>
        </div>

        {/* Footer: message + submit */}
        <div className="mt-5 flex items-center justify-between gap-4">
          {message ? (
            <p
              className={[
                "text-sm",
                isSuccess ? "text-emerald-600" : "text-red-600",
              ].join(" ")}
            >
              {message}
            </p>
          ) : (
            <span />
          )}
          <Button type="submit" variant="primary" isLoading={isPending}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ClientForm;
