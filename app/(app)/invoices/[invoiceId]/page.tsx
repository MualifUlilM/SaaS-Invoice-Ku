import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { InvoiceForm } from "@/components/app/InvoiceForm";
import { InvoiceStatusActions } from "@/components/app/InvoiceStatusActions";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui";
import { formatDate, formatIDR, getClientCompany, getClientName } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getActiveClients } from "@/lib/queries/clients";
import { getInvoiceById } from "@/lib/queries/invoices";

export default async function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;
  const { business } = await requireWorkspaceContext();
  const [{ invoice, items, history }, clients] = await Promise.all([
    getInvoiceById(business.id, invoiceId),
    getActiveClients(business.id),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Detail Invoice"
        title={`Invoice #${invoice.invoice_number}`}
        description="Lihat ringkasan invoice, ubah item jika perlu, dan perbarui status pembayaran."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/invoices">
              <Button variant="ghost" leftIcon={<ArrowLeft size={16} />}>
                Kembali
              </Button>
            </Link>
            <Link href={`/invoices/${invoice.id}/print`}>
              <Button variant="secondary" leftIcon={<Printer size={16} />}>
                Cetak / Simpan PDF
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Right column: Status + Actions + Meta */}
        <div className="space-y-4">
          {/* Status card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Status Invoice
            </p>
            <div className="mb-4">
              <StatusBadge status={invoice.status} />
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-5">
              {formatIDR(invoice.total_amount)}
            </div>
            <InvoiceStatusActions invoiceId={invoice.id} status={invoice.status} />
          </div>

          {/* Invoice meta */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Informasi Invoice
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">No. Invoice</span>
                <span className="font-medium text-slate-900">{invoice.invoice_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Klien</span>
                <div className="text-right">
                  <p className="font-medium text-slate-900">{getClientName(invoice.client)}</p>
                  {getClientCompany(invoice.client) ? (
                    <p className="text-xs text-slate-500">{getClientCompany(invoice.client)}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tanggal Dibuat</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.issue_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jatuh Tempo</span>
                <span className="font-medium text-slate-900">{formatDate(invoice.due_date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dibayar</span>
                <span className="font-medium text-slate-900">{formatIDR(invoice.amount_paid)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Diskon{" "}
                  {invoice.discount_type === "percentage"
                    ? `(${invoice.discount_value}%)`
                    : "(Nominal)"}
                </span>
                <span className="font-medium text-slate-900">
                  {formatIDR(invoice.discount_amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pajak</span>
                <span className="font-medium text-slate-900">{formatIDR(invoice.tax_amount)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Catatan
              </p>
              <p className="text-sm text-slate-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          ) : null}

          {/* History */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
              Histori Status
            </p>
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-sm"
                >
                  <p className="font-medium text-slate-900">
                    {item.from_status
                      ? `${item.from_status} → ${item.to_status}`
                      : item.to_status}
                  </p>
                  <p className="mt-1 text-slate-500">{formatDate(item.changed_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Left column: Invoice details + Edit form */}
        <div className="space-y-6">
          {/* Line items card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Item Tagihan</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-4 font-medium text-slate-500">Deskripsi</th>
                    <th className="pb-3 pr-4 font-medium text-slate-500 text-right">Qty</th>
                    <th className="pb-3 pr-4 font-medium text-slate-500 text-right">
                      Harga Satuan
                    </th>
                    <th className="pb-3 font-medium text-slate-500 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 text-slate-900">{item.description}</td>
                      <td className="py-3 pr-4 text-slate-600 text-right">{item.quantity}</td>
                      <td className="py-3 pr-4 text-slate-600 text-right">
                        {formatIDR(item.unit_price_amount)}
                      </td>
                      <td className="py-3 text-slate-900 font-medium text-right">
                        {formatIDR(item.line_total_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-5 border-t border-slate-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatIDR(invoice.subtotal_amount)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>
                  Diskon{" "}
                  {invoice.discount_type === "percentage"
                    ? `(${invoice.discount_value}%)`
                    : "(Nominal)"}
                </span>
                <span>- {formatIDR(invoice.discount_amount)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pajak</span>
                <span>{formatIDR(invoice.tax_amount)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{formatIDR(invoice.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Edit form */}
          <InvoiceForm
            invoiceId={invoice.id}
            clients={clients}
            defaultValues={{
              clientId: invoice.client_id,
              issueDate: invoice.issue_date,
              dueDate: invoice.due_date,
              discountType: invoice.discount_type,
              discountValue: invoice.discount_value,
              taxAmount: invoice.tax_amount,
              notes: invoice.notes ?? "",
              paymentInstructions: invoice.payment_instructions ?? "",
              items: items.map((item) => ({
                description: item.description,
                quantity: item.quantity,
                unitPriceAmount: item.unit_price_amount,
              })),
            }}
          />
        </div>
      </div>
    </div>
  );
}
