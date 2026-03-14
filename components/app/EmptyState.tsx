import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
      <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Icon size={24} />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
      {ctaLabel && ctaHref ? (
        <div className="mt-6">
          <Link href={ctaHref}>
            <Button variant="primary">{ctaLabel}</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;
