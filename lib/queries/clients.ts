import "server-only";

import type { ClientRow, InvoiceRow } from "@/lib/database.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getClients(businessId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClientRow[];
}

export async function getActiveClients(businessId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("business_id", businessId)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ClientRow[];
}

export async function getClientById(businessId: string, clientId: string) {
  const supabase = await createSupabaseServerClient();
  const [clientResult, invoicesResult] = await Promise.all([
    supabase
      .from("clients")
      .select("*")
      .eq("business_id", businessId)
      .eq("id", clientId)
      .maybeSingle(),
    supabase
      .from("invoices")
      .select("*")
      .eq("business_id", businessId)
      .eq("client_id", clientId)
      .order("created_at", { ascending: false }),
  ]);

  if (clientResult.error) {
    throw new Error(clientResult.error.message);
  }

  if (invoicesResult.error) {
    throw new Error(invoicesResult.error.message);
  }

  return {
    client: (clientResult.data ?? null) as ClientRow | null,
    invoices: (invoicesResult.data ?? []) as InvoiceRow[],
  };
}
