import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  tone?: "indigo" | "emerald" | "amber" | "slate";
}

const toneClasses = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
} as const;

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "indigo",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-xl ${toneClasses[tone]}`}
        >
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;
