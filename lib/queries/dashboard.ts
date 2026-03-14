import "server-only";

import type { InvoiceRow } from "@/lib/database.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { InvoiceListItem } from "@/lib/queries/invoices";

export interface DashboardSnapshot {
  clientCount: number;
  invoiceCount: number;
  paidAmount: number;
  outstandingAmount: number;
  overdueCount: number;
  draftCount: number;
  sentCount: number;
  paidCount: number;
  dueSoonCount: number;
  collectionRate: number;
  recentInvoices: InvoiceListItem[];
}

function sumInvoiceAmounts(invoices: InvoiceRow[], predicate: (invoice: InvoiceRow) => boolean) {
  return invoices
    .filter(predicate)
    .reduce((total, invoice) => total + invoice.total_amount, 0);
}

function countInvoices(invoices: InvoiceRow[], predicate: (invoice: InvoiceRow) => boolean) {
  return invoices.filter(predicate).length;
}

function isDueSoon(invoice: InvoiceRow) {
  if (invoice.status !== "sent" && invoice.status !== "overdue") {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${invoice.due_date}T00:00:00`);
  const diffInDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return diffInDays >= 0 && diffInDays <= 7;
}

export async function getDashboardSnapshot(businessId: string): Promise<DashboardSnapshot> {
  const supabase = await createSupabaseServerClient();
  const [clientsResult, invoicesResult, recentInvoicesResult] = await Promise.all([
    supabase
      .from("clients")
      .select("id", { count: "exact" })
      .eq("business_id", businessId)
      .eq("is_active", true),
    supabase.from("invoices").select("*").eq("business_id", businessId),
    supabase
      .from("invoices")
      .select("*, client:clients(id, name, company_name, email)")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  if (clientsResult.error) {
    throw new Error(clientsResult.error.message);
  }

  if (invoicesResult.error) {
    throw new Error(invoicesResult.error.message);
  }

  if (recentInvoicesResult.error) {
    throw new Error(recentInvoicesResult.error.message);
  }

  const invoices = (invoicesResult.data ?? []) as InvoiceRow[];
  const paidAmount = sumInvoiceAmounts(invoices, (invoice) => invoice.status === "paid");
  const totalBilledAmount = sumInvoiceAmounts(
    invoices,
    (invoice) => invoice.status !== "cancelled",
  );

  return {
    clientCount: clientsResult.count ?? 0,
    invoiceCount: invoices.length,
    paidAmount,
    outstandingAmount: sumInvoiceAmounts(
      invoices,
      (invoice) => invoice.status === "sent" || invoice.status === "overdue",
    ),
    overdueCount: countInvoices(invoices, (invoice) => invoice.status === "overdue"),
    draftCount: countInvoices(invoices, (invoice) => invoice.status === "draft"),
    sentCount: countInvoices(invoices, (invoice) => invoice.status === "sent"),
    paidCount: countInvoices(invoices, (invoice) => invoice.status === "paid"),
    dueSoonCount: countInvoices(invoices, isDueSoon),
    collectionRate:
      totalBilledAmount > 0 ? Math.round((paidAmount / totalBilledAmount) * 100) : 0,
    recentInvoices: (recentInvoicesResult.data ?? []) as unknown as InvoiceListItem[],
  };
}
