import { AlertTriangle, BarChart3, CircleDollarSign, Clock3, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/app/PageHeader";
import { StatCard } from "@/components/app/StatCard";
import { formatIDR } from "@/lib/formatters";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getInvoices } from "@/lib/queries/invoices";

function getLastSixMonths() {
  const months: { key: string; label: string; revenue: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" }),
      revenue: 0,
    });
  }
  return months;
}

export default async function AnalyticsPage() {
  const { business } = await requireWorkspaceContext();
  const invoices = await getInvoices(business.id);

  // ── Existing computations ────────────────────────────────────────────────
  const monthlyRevenue = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((total, invoice) => total + invoice.total_amount, 0);
  const sentCount = invoices.filter((invoice) => invoice.status === "sent").length;
  const draftCount = invoices.filter((invoice) => invoice.status === "draft").length;
  const overdueCount = invoices.filter((invoice) => invoice.status === "overdue").length;
  const conversionRate = invoices.length
    ? Math.round(
        (invoices.filter((invoice) => invoice.status === "paid").length / invoices.length) * 100,
      )
    : 0;

  const statusBreakdown = [
    { label: "Draft", count: draftCount },
    { label: "Terkirim", count: sentCount },
    {
      label: "Dibayar",
      count: invoices.filter((invoice) => invoice.status === "paid").length,
    },
    { label: "Overdue", count: overdueCount },
  ];

  // ── Outstanding (sent + overdue) ─────────────────────────────────────────
  const outstandingAmount = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  // ── Monthly revenue bar chart data ───────────────────────────────────────
  const chartMonths = getLastSixMonths();
  invoices
    .filter((inv) => inv.status === "paid" && inv.paid_at)
    .forEach((inv) => {
      const key = inv.paid_at!.slice(0, 7); // "YYYY-MM"
      const month = chartMonths.find((m) => m.key === key);
      if (month) month.revenue += inv.total_amount;
    });

  const maxRevenue = Math.max(...chartMonths.map((m) => m.revenue), 1);

  // SVG layout constants
  const barWidth = 56;
  const gap = 28;
  const maxH = 120;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Analitik"
        title="Ringkasan Kinerja"
        description="Analitik MVP difokuskan pada insight yang langsung relevan untuk cashflow harian."
      />

      {/* ── Stat Cards ────────────────────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Invoice Dibayar"
          value={String(statusBreakdown[2].count)}
          description="Jumlah invoice yang sudah lunas."
          icon={TrendingUp}
          tone="emerald"
        />
        <StatCard
          title="Revenue Tercatat"
          value={formatIDR(monthlyRevenue)}
          description="Total pembayaran yang sudah masuk."
          icon={CircleDollarSign}
          tone="indigo"
        />
        <StatCard
          title="Sedang Ditagih"
          value={String(sentCount)}
          description="Invoice masih menunggu pembayaran."
          icon={Clock3}
          tone="amber"
        />
        <StatCard
          title="Konversi Bayar"
          value={`${conversionRate}%`}
          description="Persentase invoice yang berakhir paid."
          icon={BarChart3}
          tone="slate"
        />
      </div>

      {/* ── Outstanding + Overdue highlight ───────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <p className="text-sm font-medium text-slate-500">Total Outstanding</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{formatIDR(outstandingAmount)}</p>
          <p className="mt-1 text-xs text-slate-400">
            Invoice terkirim &amp; overdue yang belum dibayar
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <p className="text-sm font-medium text-slate-500">Invoice Overdue</p>
          </div>
          <p className="mt-1 text-2xl font-bold text-amber-600">{overdueCount}</p>
          <p className="mt-1 text-xs text-slate-400">
            Invoice melewati jatuh tempo &amp; belum dibayar
          </p>
        </div>
      </div>

      {/* ── Monthly Revenue Bar Chart ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Revenue Bulanan</h2>
        <p className="text-sm text-slate-500 mb-6">6 bulan terakhir (invoice lunas)</p>

        <svg viewBox="0 0 560 160" className="w-full" aria-hidden="true">
          {chartMonths.map((month, i) => {
            const x = i * (barWidth + gap) + gap / 2;
            const h = month.revenue > 0 ? Math.max((month.revenue / maxRevenue) * maxH, 4) : 4;
            const y = maxH - h + 10;
            const isEmpty = month.revenue === 0;
            return (
              <g key={month.key}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx="6"
                  fill={isEmpty ? "#e2e8f0" : "#4f46e5"}
                  opacity={isEmpty ? 1 : 0.9}
                />
                <text
                  x={x + barWidth / 2}
                  y={148}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#94a3b8"
                >
                  {month.label}
                </text>
                {!isEmpty && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#4f46e5"
                    fontWeight="600"
                  >
                    {formatIDR(month.revenue).replace("Rp\u00a0", "")}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Breakdown Status ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-slate-900">Breakdown Status</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statusBreakdown.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
