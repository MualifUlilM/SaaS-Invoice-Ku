import { AccountSettingsForm } from "@/components/app/AccountSettingsForm";
import { PageHeader } from "@/components/app/PageHeader";
import { requireWorkspaceContext } from "@/lib/queries/auth";

export default async function AccountSettingsPage() {
  const { authUser, profile } = await requireWorkspaceContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan Akun"
        description="Kelola informasi akun Anda"
      />

      <AccountSettingsForm
        defaultValues={{
          fullName: profile.full_name,
          phone: profile.phone,
          email: authUser.email,
        }}
      />
    </div>
  );
}
