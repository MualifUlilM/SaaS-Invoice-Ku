import { Badge } from "@/components/ui";
import type { InvoiceStatus } from "@/lib/database.types";

const statusMeta: Record<
  InvoiceStatus,
  { label: string; variant: "default" | "success" | "warning" | "info" | "danger" }
> = {
  draft: {
    label: "Draft",
    variant: "default",
  },
  sent: {
    label: "Terkirim",
    variant: "info",
  },
  paid: {
    label: "Dibayar",
    variant: "success",
  },
  overdue: {
    label: "Jatuh Tempo",
    variant: "warning",
  },
  cancelled: {
    label: "Dibatalkan",
    variant: "danger",
  },
};

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={statusMeta[status].variant}>{statusMeta[status].label}</Badge>;
}

export default StatusBadge;
