import Link from "next/link";
import { Plus, FileText, Pencil } from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge } from "@/components/app/StatusBadge";
import { formatDate, formatIDR, getClientCompany, getClientName } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getInvoices } from "@/lib/queries/invoices";

export default async function InvoicesPage() {
  const { business } = await requireWorkspaceContext();
  const invoices = await getInvoices(business.id);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Invoice"
        title="Semua Invoice"
        description="Pantau status, total tagihan, dan tindak lanjut dari setiap invoice."
        actions={
          <Link
            href="/invoices/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={15} />
            Buat Invoice
          </Link>
        }
      />

      {invoices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <EmptyState
            icon={FileText}
            title="Belum ada invoice"
            description="Buat invoice pertama Anda untuk mulai melacak pembayaran klien."
            ctaHref="/invoices/new"
            ctaLabel="Buat Invoice"
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5 font-medium text-slate-500">No Invoice</th>
                  <th className="px-6 py-3.5 font-medium text-slate-500">Tanggal</th>
                  <th className="px-6 py-3.5 font-medium text-slate-500">Klien</th>
                  <th className="px-6 py-3.5 font-medium text-slate-500">Jumlah (IDR)</th>
                  <th className="px-6 py-3.5 font-medium text-slate-500">Status</th>
                  <th className="px-6 py-3.5 font-medium text-slate-500">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                      >
                        {invoice.invoice_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(invoice.issue_date)}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{getClientName(invoice.client)}</p>
                      {getClientCompany(invoice.client) ? (
                        <p className="text-xs text-slate-500">
                          {getClientCompany(invoice.client)}
                        </p>
                      ) : null}
                    </td>
                    <td className="px-6 py-4 text-slate-900 font-medium">
                      {formatIDR(invoice.total_amount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Pencil size={13} />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
