import "server-only";

import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { BusinessRow, UserRow } from "@/lib/database.types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface AuthContext {
  authUser: User | null;
  profile: UserRow | null;
  business: BusinessRow | null;
}

export interface AuthenticatedContext {
  authUser: User;
  profile: UserRow | null;
  business: BusinessRow | null;
}

export interface WorkspaceContext {
  authUser: User;
  profile: UserRow;
  business: BusinessRow;
}

export async function getAuthContext(): Promise<AuthContext> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return {
      authUser: null,
      profile: null,
      business: null,
    };
  }

  const [{ data: profile }, { data: business }] = await Promise.all([
    supabase.from("users").select("*").eq("id", authUser.id).maybeSingle(),
    supabase
      .from("businesses")
      .select("*")
      .eq("owner_user_id", authUser.id)
      .maybeSingle(),
  ]);

  return {
    authUser,
    profile: (profile ?? null) as UserRow | null,
    business: (business ?? null) as BusinessRow | null,
  };
}

export async function requireAuthenticatedUser(): Promise<AuthenticatedContext> {
  const context = await getAuthContext();

  if (!context.authUser) {
    redirect("/login");
  }

  return {
    authUser: context.authUser,
    profile: context.profile,
    business: context.business,
  };
}

export async function requireWorkspaceContext(): Promise<WorkspaceContext> {
  const context = await requireAuthenticatedUser();

  if (!context.profile?.onboarding_completed_at || !context.business) {
    redirect("/onboarding");
  }

  return {
    authUser: context.authUser,
    profile: context.profile,
    business: context.business,
  };
}
