import "server-only";

import type {
  ClientRow,
  InvoiceItemRow,
  InvoiceRow,
  InvoiceStatusHistoryRow,
} from "@/lib/database.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface InvoiceListItem extends InvoiceRow {
  client: Pick<ClientRow, "id" | "name" | "company_name" | "email"> | null;
}

export async function getInvoices(businessId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*, client:clients(id, name, company_name, email)")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as unknown as InvoiceListItem[];
}

export async function getInvoiceById(businessId: string, invoiceId: string) {
  const supabase = await createSupabaseServerClient();
  const [invoiceResult, itemsResult, historyResult] = await Promise.all([
    supabase
      .from("invoices")
      .select("*, client:clients(*)")
      .eq("business_id", businessId)
      .eq("id", invoiceId)
      .maybeSingle(),
    supabase
      .from("invoice_items")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("sort_order", { ascending: true }),
    supabase
      .from("invoice_status_history")
      .select("*")
      .eq("invoice_id", invoiceId)
      .order("changed_at", { ascending: false }),
  ]);

  if (invoiceResult.error) {
    throw new Error(invoiceResult.error.message);
  }

  if (itemsResult.error) {
    throw new Error(itemsResult.error.message);
  }

  if (historyResult.error) {
    throw new Error(historyResult.error.message);
  }

  return {
    invoice: (invoiceResult.data ?? null) as (InvoiceRow & { client: ClientRow | null }) | null,
    items: (itemsResult.data ?? []) as InvoiceItemRow[],
    history: (historyResult.data ?? []) as InvoiceStatusHistoryRow[],
  };
}
