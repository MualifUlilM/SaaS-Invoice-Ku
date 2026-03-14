import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { ClientForm } from "@/components/app/ClientForm";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui";
import { formatDate, formatIDR, getClientCompany, getClientName } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getClientById } from "@/lib/queries/clients";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const { business } = await requireWorkspaceContext();
  const { client, invoices } = await getClientById(business.id, clientId);

  if (!client) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Detail Klien"
        title={getClientName(client)}
        description={getClientCompany(client) ?? "Klien"}
      />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <ClientForm
          clientId={client.id}
          title="Edit Data Klien"
          submitLabel="Simpan Perubahan"
          defaultValues={{
            name: client.name,
            companyName: client.company_name,
            email: client.email,
            phone: client.phone,
            address: client.address,
            notes: client.notes,
          }}
        />

        {/* Invoice History Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-base font-semibold text-slate-900">Riwayat Invoice</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Semua invoice yang terkait dengan klien ini.
            </p>
          </div>

          {invoices.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={FileText}
                title="Belum ada invoice"
                description="Saat Anda membuat invoice baru untuk klien ini, riwayatnya akan tampil di sini."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      No Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Jumlah
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="hover:text-indigo-700 transition-colors"
                        >
                          {invoice.invoice_number}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(invoice.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {formatIDR(invoice.total_amount)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
