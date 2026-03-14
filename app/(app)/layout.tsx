import { AppShell } from "@/components/app/AppShell";
import { requireAuthenticatedUser } from "@/lib/queries/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser, profile, business } = await requireAuthenticatedUser();

  return (
    <AppShell
      businessName={business?.name}
      userName={profile?.full_name || authUser.email}
      userEmail={authUser.email}
    >
      {children}
    </AppShell>
  );
}
