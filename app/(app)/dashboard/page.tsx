import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  FileClock,
  FileText,
  Receipt,
  Users,
} from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/app/StatCard";
import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui";
import { formatDate, formatIDR, getClientCompany, getClientName } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getDashboardSnapshot } from "@/lib/queries/dashboard";

// Placeholder monthly bar data (decorative)
const barData = [
  { month: "Okt", value: 60 },
  { month: "Nov", value: 80 },
  { month: "Des", value: 45 },
  { month: "Jan", value: 90 },
  { month: "Feb", value: 70 },
  { month: "Mar", value: 100 },
];

export default async function DashboardPage() {
  const { business } = await requireWorkspaceContext();
  const snapshot = await getDashboardSnapshot(business.id);

  const chartMax = Math.max(...barData.map((d) => d.value));
  const chartHeight = 100;
  const barWidth = 28;
  const barGap = 12;
  const chartWidth = barData.length * (barWidth + barGap) - barGap;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        eyebrow="Dashboard"
        title={`Halo, ${business.name}`}
        description="Pantau arus tagihan, tindak lanjut invoice, dan aktivitas klien dari workspace yang sama."
        actions={
          <Link href="/invoices/new">
            <Button variant="primary" rightIcon={<ArrowRight size={16} />}>
              Buat Invoice
            </Button>
          </Link>
        }
      />

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Pendapatan"
          value={formatIDR(snapshot.paidAmount)}
          description="Total invoice yang sudah lunas."
          icon={CircleDollarSign}
          tone="emerald"
        />
        <StatCard
          title="Total Invoice"
          value={String(snapshot.invoiceCount)}
          description="Seluruh invoice di workspace ini."
          icon={Receipt}
          tone="indigo"
        />
        <StatCard
          title="Klien Aktif"
          value={String(snapshot.clientCount)}
          description="Kontak aktif yang bisa dipakai di invoice."
          icon={Users}
          tone="slate"
        />
        <StatCard
          title="Invoice Overdue"
          value={String(snapshot.overdueCount)}
          description="Perlu diprioritaskan untuk follow up."
          icon={FileClock}
          tone="amber"
        />
      </div>

      {/* Revenue Chart + Quick Stats */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* Revenue Trend SVG Bar Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900">Tren Pendapatan</h2>
          <p className="mt-1 text-sm text-slate-500">Estimasi pendapatan 6 bulan terakhir.</p>

          <div className="mt-6 overflow-x-auto">
            <svg
              width="100%"
              viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {barData.map((d, i) => {
                const barH = Math.round((d.value / chartMax) * chartHeight);
                const x = i * (barWidth + barGap);
                const y = chartHeight - barH;
                return (
                  <g key={d.month}>
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barH}
                      rx={5}
                      fill="#4f46e5"
                      opacity={i === barData.length - 1 ? 1 : 0.45}
                    />
                    <text
                      x={x + barWidth / 2}
                      y={chartHeight + 16}
                      textAnchor="middle"
                      fontSize={10}
                      fill="#94a3b8"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Ringkasan Cepat</h2>
            <p className="mt-1 text-sm text-slate-500">Status pipeline invoice saat ini.</p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs font-medium text-slate-500">Tingkat Penagihan</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{snapshot.collectionRate}%</p>
              <p className="mt-1 text-xs text-slate-500">Dari total tagihan aktif.</p>
            </div>
            <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-4">
              <p className="text-xs font-medium text-indigo-600">Jatuh Tempo Dekat</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{snapshot.dueSoonCount}</p>
              <p className="mt-1 text-xs text-slate-500">Invoice jatuh tempo dalam 7 hari.</p>
            </div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
              <p className="text-xs font-medium text-emerald-600">Invoice Lunas</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{snapshot.paidCount}</p>
              <p className="mt-1 text-xs text-slate-500">Progres kas yang sudah aman.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/clients">
              <Button variant="secondary">Lihat Klien</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost">Analytics</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Invoice Terbaru</h2>
            <p className="mt-1 text-sm text-slate-500">
              Ringkasan invoice terakhir lengkap dengan kontak dan perusahaan klien.
            </p>
          </div>
          <Link href="/invoices" className="text-sm font-medium text-indigo-600 shrink-0">
            Lihat semua
          </Link>
        </div>

        {snapshot.recentInvoices.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Belum ada invoice"
            description="Mulai dengan membuat invoice pertama Anda. Klien, item, dan statusnya akan muncul di dashboard."
            ctaHref="/invoices/new"
            ctaLabel="Buat Invoice"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 font-medium text-slate-500">No Invoice</th>
                  <th className="pb-3 font-medium text-slate-500">Klien</th>
                  <th className="pb-3 font-medium text-slate-500">Tanggal</th>
                  <th className="pb-3 font-medium text-slate-500">Jumlah</th>
                  <th className="pb-3 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {snapshot.recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="font-semibold text-slate-900 hover:text-indigo-600"
                      >
                        {invoice.invoice_number}
                      </Link>
                    </td>
                    <td className="py-4">
                      <p className="font-medium text-slate-900">
                        {getClientName(invoice.client)}
                      </p>
                      {getClientCompany(invoice.client) ? (
                        <p className="text-xs text-slate-500">
                          {getClientCompany(invoice.client)}
                        </p>
                      ) : null}
                    </td>
                    <td className="py-4 text-slate-600">{formatDate(invoice.due_date)}</td>
                    <td className="py-4 text-slate-600">{formatIDR(invoice.total_amount)}</td>
                    <td className="py-4">
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
  );
}
