import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate, formatIDR, getClientCompany, getClientName } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getInvoiceById } from "@/lib/queries/invoices";
import { PrintButton } from "./PrintButton";

export default async function InvoicePrintPage({
  params,
}: {
  params: Promise<{ invoiceId: string }>;
}) {
  const { invoiceId } = await params;
  const { business } = await requireWorkspaceContext();
  const { invoice, items } = await getInvoiceById(business.id, invoiceId);

  if (!invoice) {
    notFound();
  }

  const statusLabel: Record<string, string> = {
    draft: "Draft",
    sent: "Terkirim",
    paid: "Lunas",
    overdue: "Jatuh Tempo",
    cancelled: "Dibatalkan",
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .invoice-card { box-shadow: none !important; }
          @page { margin: 1.5cm; size: A4 portrait; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-6 md:p-10">
        {/* Print controls - hidden when printing */}
        <div className="no-print max-w-3xl mx-auto mb-6 flex items-center justify-between">
          <Link
            href={`/invoices/${invoiceId}`}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            ← Kembali ke Detail
          </Link>
          <PrintButton />
        </div>

        {/* Invoice card */}
        <div className="invoice-card max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-8 py-6 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{business.name}</h1>
              {business.email && (
                <p className="text-indigo-200 text-sm mt-1">{business.email}</p>
              )}
              {business.phone && (
                <p className="text-indigo-200 text-sm">{business.phone}</p>
              )}
              {business.address && (
                <p className="text-indigo-200 text-sm mt-1">{business.address}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-white tracking-tight">INVOICE</p>
              <p className="text-indigo-200 mt-1 text-sm">#{invoice.invoice_number}</p>
              <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white">
                {statusLabel[invoice.status] ?? invoice.status}
              </span>
            </div>
          </div>

          <div className="px-8 py-6">
            {/* Bill to + dates */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Ditagih Kepada
                </p>
                <p className="font-semibold text-slate-900">
                  {getClientName(invoice.client)}
                </p>
                {getClientCompany(invoice.client) && (
                  <p className="text-sm text-slate-500">
                    {getClientCompany(invoice.client)}
                  </p>
                )}
                {invoice.client?.email && (
                  <p className="text-sm text-slate-500">{invoice.client.email}</p>
                )}
              </div>
              <div className="text-right space-y-1">
                <div>
                  <p className="text-xs text-slate-400">Tanggal Invoice</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDate(invoice.issue_date)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Jatuh Tempo</p>
                  <p className="text-sm font-medium text-slate-900">
                    {formatDate(invoice.due_date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Line items */}
            <table className="w-full text-sm border-collapse mb-6">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Deskripsi
                  </th>
                  <th className="text-right py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Qty
                  </th>
                  <th className="text-right py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Harga Satuan
                  </th>
                  <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
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

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>{formatIDR(invoice.subtotal_amount)}</span>
                </div>
                {invoice.discount_amount > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>
                      Diskon{" "}
                      {invoice.discount_type === "percentage"
                        ? `(${invoice.discount_value}%)`
                        : "(Nominal)"}
                    </span>
                    <span>- {formatIDR(invoice.discount_amount)}</span>
                  </div>
                )}
                {invoice.tax_amount > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>Pajak</span>
                    <span>{formatIDR(invoice.tax_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t-2 border-slate-900 pt-2 text-base font-bold text-slate-900">
                  <span>TOTAL</span>
                  <span>{formatIDR(invoice.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Payment instructions */}
            {invoice.payment_instructions && (
              <div className="border border-indigo-100 bg-indigo-50 rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
                  Instruksi Pembayaran
                </p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {invoice.payment_instructions}
                </p>
              </div>
            )}

            {/* Notes */}
            {invoice.notes && (
              <div className="border border-slate-200 rounded-xl p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Catatan
                </p>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{invoice.notes}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              Dibuat dengan InvoiceKu · {business.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
