import { z } from "zod";

const supabaseEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const resendEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
});

export function hasSupabaseEnv() {
  return supabaseEnvSchema.safeParse(process.env).success;
}

export function getSupabaseEnv() {
  const parsed = supabaseEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return parsed.data;
}

export function hasResendEnv() {
  return resendEnvSchema.safeParse(process.env).success;
}

export function getResendApiKey() {
  const parsed = resendEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    return null;
  }

  return parsed.data.RESEND_API_KEY;
}

export function getSiteUrl() {
  const parsed = z
    .object({
      NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
    })
    .safeParse(process.env);

  return parsed.success && parsed.data.NEXT_PUBLIC_SITE_URL
    ? parsed.data.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000";
}
