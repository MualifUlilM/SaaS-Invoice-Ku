"use server";

import { revalidatePath } from "next/cache";
import type { ActionResult } from "@/lib/actions/types";
import { formatValidationErrors } from "@/lib/actions/utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { clientSchema, type ClientInput } from "@/lib/validators/client";
import { requireWorkspaceContext } from "@/lib/queries/auth";

function normalizeOptional(value: string) {
  return value.trim() ? value.trim() : null;
}

export async function createClientAction(input: ClientInput): Promise<ActionResult<{ id: string }>> {
  const parsed = clientSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      business_id: business.id,
      name: parsed.data.name.trim(),
      company_name: normalizeOptional(parsed.data.companyName),
      email: normalizeOptional(parsed.data.email),
      phone: normalizeOptional(parsed.data.phone),
      address: normalizeOptional(parsed.data.address),
      notes: normalizeOptional(parsed.data.notes),
    } as never)
    .select("id")
    .single();

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/clients");
  revalidatePath("/dashboard");
  revalidatePath("/invoices/new");

  return {
    success: true,
    message: "Klien berhasil ditambahkan.",
    data: {
      id: data.id,
    },
  };
}

export async function updateClientAction(
  clientId: string,
  input: ClientInput,
): Promise<ActionResult> {
  const parsed = clientSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("clients")
    .update({
      name: parsed.data.name.trim(),
      company_name: normalizeOptional(parsed.data.companyName),
      email: normalizeOptional(parsed.data.email),
      phone: normalizeOptional(parsed.data.phone),
      address: normalizeOptional(parsed.data.address),
      notes: normalizeOptional(parsed.data.notes),
    } as never)
    .eq("business_id", business.id)
    .eq("id", clientId);

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/invoices/new");

  return {
    success: true,
    message: "Klien berhasil diperbarui.",
  };
}

export async function archiveClientAction(clientId: string): Promise<ActionResult> {
  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("clients")
    .update({ is_active: false } as never)
    .eq("business_id", business.id)
    .eq("id", clientId);

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/clients");
  revalidatePath(`/clients/${clientId}`);

  return {
    success: true,
    message: "Klien berhasil diarsipkan.",
    redirectTo: "/clients",
  };
}
