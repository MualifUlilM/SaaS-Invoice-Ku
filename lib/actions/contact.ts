"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/actions/types";
import { formatValidationErrors } from "@/lib/actions/utils";
import { contactSchema, type ContactInput } from "@/lib/validators/contact";

export async function createContactMessageAction(
  input: ContactInput,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("contact_messages").insert({
    user_id: user?.id ?? null,
    name: parsed.data.name,
    email: parsed.data.email,
    topic: parsed.data.topic,
    message: parsed.data.message,
    source: "website-contact-form",
  } as never);

  if (error) {
    return {
      success: false,
      errors: {
        general: "Pesan belum dapat dikirim. Silakan coba lagi.",
      },
    };
  }

  return {
    success: true,
    message: "Pesan berhasil dikirim.",
  };
}
