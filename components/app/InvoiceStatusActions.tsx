"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import {
  deleteDraftInvoiceAction,
  sendInvoiceAction,
  updateInvoiceStatusAction,
} from "@/lib/actions/invoices";
import type { InvoiceStatus } from "@/lib/database.types";

interface InvoiceStatusActionsProps {
  invoiceId: string;
  status: InvoiceStatus;
}

export function InvoiceStatusActions({
  invoiceId,
  status,
}: InvoiceStatusActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function runAction(action: () => Promise<{
    success: boolean;
    message?: string;
    redirectTo?: string;
    errors?: Record<string, string>;
  }>) {
    setMessage("");
    startTransition(async () => {
      const result = await action();

      if (!result.success) {
        setMessage(result.errors?.general ?? "Perubahan belum berhasil disimpan.");
        return;
      }

      setMessage(result.message ?? "");

      if (result.redirectTo) {
        router.push(result.redirectTo);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        {status !== "sent" ? (
          <Button
            variant="primary"
            disabled={isPending}
            onClick={() => runAction(() => sendInvoiceAction(invoiceId))}
          >
            Kirim Invoice
          </Button>
        ) : null}

        {status !== "paid" ? (
          <Button
            variant="primary"
            disabled={isPending}
            onClick={() => runAction(() => updateInvoiceStatusAction(invoiceId, "paid"))}
          >
            Tandai Dibayar
          </Button>
        ) : null}

        {status !== "overdue" ? (
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={() => runAction(() => updateInvoiceStatusAction(invoiceId, "overdue"))}
          >
            Tandai Overdue
          </Button>
        ) : null}

        {status === "draft" ? (
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={() => runAction(() => deleteDraftInvoiceAction(invoiceId))}
          >
            Hapus Draft
          </Button>
        ) : null}

        {status !== "cancelled" ? (
          <Button
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={isPending}
            onClick={() => runAction(() => updateInvoiceStatusAction(invoiceId, "cancelled"))}
          >
            Batalkan
          </Button>
        ) : null}
      </div>
      {message ? <p className="text-sm text-slate-500">{message}</p> : null}
    </div>
  );
}

export default InvoiceStatusActions;
