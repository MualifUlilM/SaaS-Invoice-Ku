"use server";

import { revalidatePath } from "next/cache";
import type { BusinessRow } from "@/lib/database.types";
import type { ActionResult } from "@/lib/actions/types";
import { formatValidationErrors } from "@/lib/actions/utils";
import { businessSchema, type BusinessInput } from "@/lib/validators/business";
import { slugify } from "@/lib/formatters";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface AccountInput {
  fullName: string;
  phone: string;
}

function normalizeOptional(value: string) {
  return value.trim() ? value.trim() : null;
}

async function resolveUniqueBusinessSlug(baseName: string, currentBusinessId?: string) {
  const supabase = await createSupabaseServerClient();
  const baseSlug = slugify(baseName) || "invoiceku-bisnis";
  let candidate = baseSlug;
  let attempt = 1;

  while (attempt <= 20) {
    const { data, error } = await supabase
      .from("businesses")
      .select("id")
      .eq("slug", candidate);

    if (error) {
      throw new Error(error.message);
    }

    const existingBusiness = data?.[0] as { id: string } | undefined;

    if (!existingBusiness || existingBusiness.id === currentBusinessId) {
      return candidate;
    }

    attempt += 1;
    candidate = `${baseSlug}-${attempt}`;
  }

  return `${baseSlug}-${Date.now()}`;
}

async function requireUserForMutation() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, user: null };
  }

  return { supabase, user };
}

export async function completeOnboardingAction(
  input: BusinessInput,
): Promise<ActionResult> {
  const parsed = businessSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const { supabase, user } = await requireUserForMutation();

  if (!user) {
    return {
      success: false,
      redirectTo: "/login",
      errors: {
        general: "Sesi Anda telah berakhir. Silakan masuk kembali.",
      },
    };
  }

  const {
    data: existingBusiness,
    error: businessFetchError,
  } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_user_id", user.id)
    .maybeSingle();
  const businessRecord = existingBusiness as BusinessRow | null;

  if (businessFetchError) {
    return {
      success: false,
      errors: {
        general: businessFetchError.message,
      },
    };
  }

  const slug = await resolveUniqueBusinessSlug(parsed.data.name, businessRecord?.id);

  const businessPayload = {
    owner_user_id: user.id,
    name: parsed.data.name.trim(),
    slug,
    email: normalizeOptional(parsed.data.email),
    phone: normalizeOptional(parsed.data.phone),
    address: normalizeOptional(parsed.data.address),
    city: normalizeOptional(parsed.data.city),
    province: normalizeOptional(parsed.data.province),
    postal_code: normalizeOptional(parsed.data.postalCode),
    country: parsed.data.country.trim(),
    invoice_prefix: parsed.data.invoicePrefix.trim().toUpperCase(),
    bank_name: normalizeOptional(parsed.data.bankName ?? ""),
    bank_account_number: normalizeOptional(parsed.data.bankAccountNumber ?? ""),
    bank_account_name: normalizeOptional(parsed.data.bankAccountName ?? ""),
  };

  const [businessResult, profileResult] = await Promise.all([
    businessRecord
      ? supabase
          .from("businesses")
          .update(businessPayload as never)
          .eq("id", businessRecord.id)
      : supabase.from("businesses").insert(businessPayload as never),
    supabase.from("users").upsert(
      {
        id: user.id,
        email: user.email ?? "",
        onboarding_completed_at: new Date().toISOString(),
      } as never,
      { onConflict: "id" },
    ),
  ]);

  if (businessResult.error) {
    return {
      success: false,
      errors: {
        general: businessResult.error.message,
      },
    };
  }

  if (profileResult.error) {
    return {
      success: false,
      errors: {
        general: profileResult.error.message,
      },
    };
  }

  revalidatePath("/onboarding");
  revalidatePath("/dashboard");
  revalidatePath("/settings/business");

  return {
    success: true,
    redirectTo: "/dashboard",
  };
}

export async function updateBusinessSettingsAction(
  input: BusinessInput,
): Promise<ActionResult> {
  const result = await completeOnboardingAction(input);

  if (!result.success) {
    return result;
  }

  return {
    success: true,
    message: "Profil bisnis berhasil diperbarui.",
  };
}

export async function updateAccountSettingsAction(
  input: AccountInput,
): Promise<ActionResult> {
  const fullName = input.fullName.trim();
  const phone = input.phone.trim();

  if (fullName.length < 2) {
    return {
      success: false,
      errors: {
        fullName: "Nama minimal 2 karakter.",
      },
    };
  }

  const { supabase, user } = await requireUserForMutation();

  if (!user) {
    return {
      success: false,
      redirectTo: "/login",
    };
  }

  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      full_name: fullName,
      phone: phone || null,
    } as never,
    { onConflict: "id" },
  );

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  revalidatePath("/settings/account");
  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Profil akun berhasil diperbarui.",
  };
}
