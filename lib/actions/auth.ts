"use server";

import { getSiteUrl } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type SignInInput,
  type SignUpInput,
} from "@/lib/validators/auth";
import { formatValidationErrors } from "@/lib/actions/utils";
import type { ActionResult } from "@/lib/actions/types";

export async function signInAction(input: SignInInput): Promise<ActionResult> {
  const parsed = signInSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return {
      success: false,
      errors: {
        general: "Email atau password salah.",
      },
    };
  }

  return {
    success: true,
    redirectTo: "/dashboard",
  };
}

export async function signUpAction(input: SignUpInput): Promise<ActionResult> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { fullName, email, password } = parsed.data;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
      emailRedirectTo: `${getSiteUrl()}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  return {
    success: true,
    message: data.session
      ? "Akun berhasil dibuat."
      : "Akun berhasil dibuat. Cek email Anda untuk verifikasi.",
    redirectTo: data.session ? "/onboarding" : "/login?message=check-email",
  };
}

export async function requestPasswordResetAction(
  input: ForgotPasswordInput,
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { email, origin } = parsed.data;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/reset-password`,
  });

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  return {
    success: true,
    message: "Link reset password telah dikirim ke email Anda.",
  };
}

export async function updatePasswordAction(
  input: ResetPasswordInput,
): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      errors: formatValidationErrors(parsed.error),
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      success: false,
      errors: {
        general: error.message,
      },
    };
  }

  return {
    success: true,
    message: "Password berhasil diperbarui.",
    redirectTo: "/dashboard",
  };
}
