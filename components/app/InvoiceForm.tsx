"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { createInvoiceAction, updateInvoiceAction } from "@/lib/actions/invoices";
import type { InvoiceDiscountType } from "@/lib/database.types";
import { formatClientOptionLabel, formatIDR } from "@/lib/formatters";
import {
  calculateInvoiceDiscountAmount,
  calculateInvoiceSubtotal,
  calculateInvoiceTotals,
} from "@/lib/invoice-calculations";

interface InvoiceFormProps {
  invoiceId?: string;
  clients: Array<{
    id: string;
    name: string;
    company_name: string | null;
  }>;
  defaultPaymentInstructions?: string;
  defaultValues?: {
    clientId: string;
    issueDate: string;
    dueDate: string;
    discountType: InvoiceDiscountType;
    discountValue: number;
    taxAmount: number;
    notes: string;
    paymentInstructions: string;
    items: Array<{
      description: string;
      quantity: number;
      unitPriceAmount: number;
    }>;
  };
}

interface InvoiceItemState {
  rowId: string;
  description: string;
  quantity: string;
  unitPriceAmount: string;
}

function createItemState(rowId: string, initial?: Partial<InvoiceItemState>): InvoiceItemState {
  return {
    rowId,
    description: initial?.description ?? "",
    quantity: initial?.quantity ?? "1",
    unitPriceAmount: initial?.unitPriceAmount ?? "0",
  };
}

function getTodayDateInput() {
  return new Date().toISOString().slice(0, 10);
}

function getDueDateInput() {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 7);
  return dueDate.toISOString().slice(0, 10);
}

const selectClassName =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100";

export function InvoiceForm({ invoiceId, clients, defaultPaymentInstructions, defaultValues }: InvoiceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const nextItemIdRef = useRef((defaultValues?.items.length ?? 0) + 1);
  const [values, setValues] = useState(() => ({
    clientId: defaultValues?.clientId ?? clients[0]?.id ?? "",
    issueDate: defaultValues?.issueDate ?? getTodayDateInput(),
    dueDate: defaultValues?.dueDate ?? getDueDateInput(),
    discountType: defaultValues?.discountType ?? "fixed",
    discountValue: String(defaultValues?.discountValue ?? 0),
    taxAmount: String(defaultValues?.taxAmount ?? 0),
    notes: defaultValues?.notes ?? "",
    paymentInstructions: defaultValues?.paymentInstructions ?? defaultPaymentInstructions ?? "",
  }));
  const [items, setItems] = useState<InvoiceItemState[]>(
    defaultValues?.items?.length
      ? defaultValues.items.map((item, index) =>
          createItemState(`item-${index}`, {
            description: item.description,
            quantity: String(item.quantity),
            unitPriceAmount: String(item.unitPriceAmount),
          }),
        )
      : [createItemState("item-0")],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const normalizedItems = items.map((item) => ({
    quantity: Number(item.quantity || 0),
    unitPriceAmount: Number(item.unitPriceAmount || 0),
  }));
  const subtotal = calculateInvoiceSubtotal(normalizedItems);
  const discountValue = Number(values.discountValue || 0);
  const actualDiscountAmount = calculateInvoiceDiscountAmount(
    subtotal,
    values.discountType,
    discountValue,
  );
  const totals = calculateInvoiceTotals(
    normalizedItems,
    values.discountType,
    discountValue,
    Number(values.taxAmount || 0),
  );

  function updateItem(index: number, field: keyof Omit<InvoiceItemState, "rowId">, value: string) {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
    setErrors((current) => ({ ...current, [`items.${index}.${field}`]: "" }));
  }

  function appendItem() {
    const nextItemId = `item-${nextItemIdRef.current}`;
    nextItemIdRef.current += 1;
    setItems((current) => [...current, createItemState(nextItemId)]);
  }

  function removeItem(index: number) {
    setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setErrors((current) =>
      Object.fromEntries(
        Object.entries(current).filter(([key]) => !key.startsWith("items.")),
      ),
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    startTransition(async () => {
      const payload = {
        clientId: values.clientId,
        issueDate: values.issueDate,
        dueDate: values.dueDate,
        discountType: values.discountType,
        discountValue: Number(values.discountValue || 0),
        taxAmount: Number(values.taxAmount || 0),
        notes: values.notes,
        paymentInstructions: values.paymentInstructions,
        items: items.map((item) => ({
          description: item.description,
          quantity: Number(item.quantity || 0),
          unitPriceAmount: Number(item.unitPriceAmount || 0),
        })),
      };
      const result = invoiceId
        ? await updateInvoiceAction(invoiceId, payload)
        : await createInvoiceAction(payload);

      if (!result.success) {
        setErrors(result.errors ?? {});
        setMessage(result.errors?.general ?? "");
        return;
      }

      setErrors({});
      setMessage(result.message ?? "");

      if (result.redirectTo) {
        router.push(result.redirectTo);
        return;
      }

      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Main details card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <p className="text-base font-semibold text-slate-900 mb-4">Detail Invoice</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 md:col-span-3">
            <label htmlFor="invoice-client" className="text-sm font-medium text-slate-700">
              Klien
            </label>
            <select
              id="invoice-client"
              value={values.clientId}
              onChange={(event) =>
                setValues((current) => ({ ...current, clientId: event.target.value }))
              }
              className={[selectClassName, errors.clientId ? "border-red-400" : ""].join(" ")}
              disabled={isPending}
            >
              <option value="">Pilih klien</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {formatClientOptionLabel(client)}
                </option>
              ))}
            </select>
            {errors.clientId ? <p className="text-xs text-red-600">{errors.clientId}</p> : null}
          </div>

          <Input
            label="Tanggal Invoice"
            id="invoice-issue-date"
            type="date"
            value={values.issueDate}
            onChange={(event) =>
              setValues((current) => ({ ...current, issueDate: event.target.value }))
            }
            error={errors.issueDate}
            disabled={isPending}
            required
          />
          <Input
            label="Jatuh Tempo"
            id="invoice-due-date"
            type="date"
            value={values.dueDate}
            onChange={(event) =>
              setValues((current) => ({ ...current, dueDate: event.target.value }))
            }
            error={errors.dueDate}
            disabled={isPending}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="invoice-discount-type" className="text-sm font-medium text-slate-700">
              Tipe Diskon
            </label>
            <select
              id="invoice-discount-type"
              value={values.discountType}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  discountType: event.target.value as InvoiceDiscountType,
                }))
              }
              className={selectClassName}
              disabled={isPending}
            >
              <option value="fixed">Nominal</option>
              <option value="percentage">Persentase</option>
            </select>
          </div>

          <Input
            label={values.discountType === "percentage" ? "Diskon (%)" : "Diskon (IDR)"}
            id="invoice-discount-value"
            type="number"
            min="0"
            max={values.discountType === "percentage" ? "100" : undefined}
            step={values.discountType === "percentage" ? "0.1" : "1"}
            value={values.discountValue}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                discountValue: event.target.value,
              }))
            }
            error={errors.discountValue}
            helperText={
              values.discountType === "percentage"
                ? "Masukkan persentase diskon, misalnya 10 untuk 10%."
                : "Masukkan nominal diskon dalam Rupiah."
            }
            disabled={isPending}
          />

          <Input
            label="Pajak (IDR)"
            id="invoice-tax"
            type="number"
            min="0"
            step="1"
            value={values.taxAmount}
            onChange={(event) =>
              setValues((current) => ({ ...current, taxAmount: event.target.value }))
            }
            error={errors.taxAmount}
            disabled={isPending}
          />
        </div>
      </div>

      {/* Line items card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-base font-semibold text-slate-900">Item Invoice</p>
            <p className="text-sm text-slate-500 mt-0.5">
              Tambahkan layanan atau produk yang ditagihkan.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={appendItem}
          >
            Tambah Item
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.rowId}
              className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-start p-3 bg-slate-50 rounded-xl"
            >
              <Input
                label={`Deskripsi Item ${index + 1}`}
                id={`invoice-item-description-${item.rowId}`}
                value={item.description}
                onChange={(event) => updateItem(index, "description", event.target.value)}
                error={errors[`items.${index}.description`]}
                disabled={isPending}
                required
              />
              <Input
                label="Qty"
                id={`invoice-item-quantity-${item.rowId}`}
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(event) => updateItem(index, "quantity", event.target.value)}
                error={errors[`items.${index}.quantity`]}
                disabled={isPending}
                required
              />
              <Input
                label="Harga Satuan"
                id={`invoice-item-price-${item.rowId}`}
                type="number"
                min="0"
                step="1"
                value={item.unitPriceAmount}
                onChange={(event) =>
                  updateItem(index, "unitPriceAmount", event.target.value)
                }
                error={errors[`items.${index}.unitPriceAmount`]}
                disabled={isPending}
                required
              />
              <div className="flex items-end pb-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={items.length === 1 || isPending}
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => removeItem(index)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes + Totals card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="invoice-notes" className="text-sm font-medium text-slate-700">
                Catatan
              </label>
              <textarea
                id="invoice-notes"
                rows={4}
                value={values.notes}
                onChange={(event) =>
                  setValues((current) => ({ ...current, notes: event.target.value }))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                disabled={isPending}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="invoice-payment-instructions"
                className="text-sm font-medium text-slate-700"
              >
                Instruksi Pembayaran
              </label>
              <textarea
                id="invoice-payment-instructions"
                rows={4}
                value={values.paymentInstructions}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    paymentInstructions: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-200 hover:border-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                disabled={isPending}
              />
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-900 mb-4">Ringkasan</p>
            <div className="space-y-3 text-sm text-right">
              <div className="flex items-center justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatIDR(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>
                  Diskon{" "}
                  {values.discountType === "percentage"
                    ? `(${values.discountValue || 0}%)`
                    : "(Nominal)"}
                </span>
                <span>{formatIDR(actualDiscountAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Pajak</span>
                <span>{formatIDR(totals.taxAmount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>{formatIDR(totals.totalAmount)}</span>
              </div>
            </div>
            {message ? <p className="mt-4 text-sm text-indigo-600">{message}</p> : null}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg" isLoading={isPending}>
          {invoiceId ? "Simpan Perubahan" : "Buat Invoice"}
        </Button>
      </div>
    </form>
  );
}

export default InvoiceForm;
