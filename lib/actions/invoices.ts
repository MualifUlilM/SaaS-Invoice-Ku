"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import type { ActionResult } from "@/lib/actions/types";
import type { InvoiceRow } from "@/lib/database.types";
import { formatValidationErrors } from "@/lib/actions/utils";
import { getResendApiKey } from "@/lib/env";
import { formatClientOptionLabel, getClientName, formatDate, formatIDR } from "@/lib/formatters";
import { calculateInvoiceTotals } from "@/lib/invoice-calculations";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  invoiceSchema,
  type InvoiceInput,
  type InvoiceItemInput,
} from "@/lib/validators/invoice";

function normalizeOptional(value: string) {
  return value.trim() ? value.trim() : null;
}

async function syncInvoiceItems(invoiceId: string, items: InvoiceItemInput[]) {
  const supabase = await createSupabaseServerClient();
  const { error: deleteError } = await supabase
    .from("invoice_items")
    .delete()
    .eq("invoice_id", invoiceId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  const { error: insertError } = await supabase.from("invoice_items").insert(
    items.map((item, index) => ({
      invoice_id: invoiceId,
      sort_order: index,
      description: item.description.trim(),
      quantity: item.quantity,
      unit_price_amount: item.unitPriceAmount,
      line_total_amount: item.quantity * item.unitPriceAmount,
    })) as never,
  );

  if (insertError) {
    throw new Error(insertError.message);
  }
}

export async function createInvoiceAction(
  input: InvoiceInput,
): Promise<ActionResult<{ id: string }>> {
  const parsed = invoiceSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const totals = calculateInvoiceTotals(
    parsed.data.items,
    parsed.data.discountType,
    parsed.data.discountValue,
    parsed.data.taxAmount,
  );

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .insert({
      business_id: business.id,
      client_id: parsed.data.clientId,
      issue_date: parsed.data.issueDate,
      due_date: parsed.data.dueDate,
      discount_type: parsed.data.discountType,
      discount_value: parsed.data.discountValue,
      discount_amount: totals.discountAmount,
      tax_amount: totals.taxAmount,
      subtotal_amount: totals.subtotalAmount,
      total_amount: totals.totalAmount,
      notes: normalizeOptional(parsed.data.notes),
      payment_instructions: normalizeOptional(parsed.data.paymentInstructions),
    } as never)
    .select("id")
    .single();

  if (invoiceError) {
    return {
      success: false,
      errors: {
        general: invoiceError.message,
      },
    };
  }

  try {
    await syncInvoiceItems(invoice.id, parsed.data.items);
  } catch (error) {
    await supabase.from("invoices").delete().eq("id", invoice.id);

    return {
      success: false,
      errors: {
        general: error instanceof Error ? error.message : "Gagal menyimpan item invoice.",
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/invoices");
  revalidatePath(`/invoices/${invoice.id}`);
  revalidatePath(`/invoices/${invoice.id}/print`);

  return {
    success: true,
    message: "Invoice berhasil dibuat.",
    data: {
      id: invoice.id,
    },
    redirectTo: `/invoices/${invoice.id}`,
  };
}

export async function updateInvoiceAction(
  invoiceId: string,
  input: InvoiceInput,
): Promise<ActionResult> {
  const parsed = invoiceSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { data: existingInvoice, error: existingInvoiceError } = await supabase
    .from("invoices")
    .select("status")
    .eq("business_id", business.id)
    .eq("id", invoiceId)
    .maybeSingle();

  if (existingInvoiceError) {
    return {
      success: false,
      errors: {
        general: existingInvoiceError.message,
      },
    };
  }

  if (!existingInvoice) {
    return {
      success: false,
      errors: {
        general: "Invoice tidak ditemukan.",
      },
    };
  }

  if (existingInvoice.status === "paid") {
    return {
      success: false,
      errors: {
        general: "Invoice yang sudah dibayar tidak dapat diubah.",
      },
    };
  }

  const totals = calculateInvoiceTotals(
    parsed.data.items,
    parsed.data.discountType,
    parsed.data.discountValue,
    parsed.data.taxAmount,
  );

  const { error } = await supabase
    .from("invoices")
    .update({
      client_id: parsed.data.clientId,
      issue_date: parsed.data.issueDate,
      due_date: parsed.data.dueDate,
      discount_type: parsed.data.discountType,
      discount_value: parsed.data.discountValue,
      discount_amount: totals.discountAmount,
      tax_amount: totals.taxAmount,
      subtotal_amount: totals.subtotalAmount,
      total_amount: totals.totalAmount,
      notes: normalizeOptional(parsed.data.notes),
      payment_instructions: normalizeOptional(parsed.data.paymentInstructions),
    } as never)
    .eq("business_id", business.id)
    .eq("id", invoiceId);

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  try {
    await syncInvoiceItems(invoiceId, parsed.data.items);
  } catch (itemError) {
    return {
      success: false,
      errors: {
        general: itemError instanceof Error ? itemError.message : "Gagal memperbarui item invoice.",
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/invoices");
  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/invoices/${invoiceId}/print`);

  return {
    success: true,
    message: "Invoice berhasil diperbarui.",
  };
}

export async function updateInvoiceStatusAction(
  invoiceId: string,
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled",
): Promise<ActionResult> {
  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();

  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .select("total_amount")
    .eq("business_id", business.id)
    .eq("id", invoiceId)
    .maybeSingle();

  if (invoiceError) {
    return {
      success: false,
      errors: {
        general: invoiceError.message,
      },
    };
  }

  if (!invoice) {
    return {
      success: false,
      errors: {
        general: "Invoice tidak ditemukan.",
      },
    };
  }

  const payload: Record<string, string | number | null> = {
    status,
  };

  if (status === "sent") {
    payload.sent_at = new Date().toISOString();
  }

  if (status === "paid") {
    payload.paid_at = new Date().toISOString();
    payload.amount_paid = invoice.total_amount;
  }

  const { error } = await supabase
    .from("invoices")
    .update(payload as never)
    .eq("business_id", business.id)
    .eq("id", invoiceId);

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/invoices");
  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath(`/invoices/${invoiceId}/print`);

  return {
    success: true,
    message: "Status invoice berhasil diperbarui.",
  };
}

export async function deleteDraftInvoiceAction(invoiceId: string): Promise<ActionResult> {
  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .select("status")
    .eq("business_id", business.id)
    .eq("id", invoiceId)
    .maybeSingle();

  if (invoiceError) {
    return {
      success: false,
      errors: {
        general: invoiceError.message,
      },
    };
  }

  if (!invoice || invoice.status !== "draft") {
    return {
      success: false,
      errors: {
        general: "Hanya invoice draft yang dapat dihapus.",
      },
    };
  }

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("business_id", business.id)
    .eq("id", invoiceId);

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/invoices");

  return {
    success: true,
    message: "Invoice berhasil dihapus.",
    redirectTo: "/invoices",
  };
}

export async function sendInvoiceAction(invoiceId: string): Promise<ActionResult> {
  const { business } = await requireWorkspaceContext();
  const supabase = await createSupabaseServerClient();
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*, client:clients(*)")
    .eq("business_id", business.id)
    .eq("id", invoiceId)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  if (!invoice) {
    return {
      success: false,
      errors: {
        general: "Invoice tidak ditemukan.",
      },
    };
  }

  const invoiceRecord = invoice as InvoiceRow & {
    client: {
      name: string;
      email: string | null;
      company_name: string | null;
    } | null;
  };

  const client = invoiceRecord.client as {
    name: string;
    email: string | null;
    company_name: string | null;
  } | null;

  if (!client?.email) {
    return {
      success: false,
      errors: {
        general: "Klien belum memiliki alamat email.",
      },
    };
  }

  const resendApiKey = getResendApiKey();

  if (resendApiKey) {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "InvoiceKu <onboarding@resend.dev>",
      to: client.email,
      subject: `Invoice ${invoiceRecord.invoice_number} dari ${business.name}`,
      html: `
        <div style="font-family: Inter, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
          <h1 style="font-size: 24px; margin-bottom: 8px;">Invoice ${invoiceRecord.invoice_number}</h1>
          <p>Halo ${getClientName(client)},</p>
          <p>${business.name} telah mengirim invoice dengan total <strong>${formatIDR(
            invoiceRecord.total_amount,
          )}</strong>.</p>
          <p>Tanggal jatuh tempo: <strong>${formatDate(invoiceRecord.due_date)}</strong></p>
          <p>Penerima invoice: <strong>${formatClientOptionLabel(client)}</strong></p>
          <p>Silakan hubungi ${business.email || business.name} bila ada pertanyaan terkait invoice ini.</p>
          <p style="margin-top: 24px;">Terima kasih,<br />${business.name}</p>
        </div>
      `,
    });
  }

  const statusResult = await updateInvoiceStatusAction(invoiceId, "sent");

  if (!statusResult.success) {
    return statusResult;
  }

  return {
    success: true,
    message: resendApiKey
      ? "Invoice berhasil dikirim lewat email."
      : "Invoice ditandai sebagai terkirim. Atur RESEND_API_KEY untuk mengirim email otomatis.",
  };
}
