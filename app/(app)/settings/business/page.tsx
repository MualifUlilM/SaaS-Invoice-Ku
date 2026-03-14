import { BusinessProfileForm } from "@/components/app/BusinessProfileForm";
import { PageHeader } from "@/components/app/PageHeader";
import { requireWorkspaceContext } from "@/lib/queries/auth";

export default async function BusinessSettingsPage() {
  const { business } = await requireWorkspaceContext();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil Bisnis"
        description="Informasi bisnis yang tampil di invoice"
      />

      <BusinessProfileForm
        mode="settings"
        defaultValues={{
          name: business.name,
          email: business.email,
          phone: business.phone,
          address: business.address,
          city: business.city,
          province: business.province,
          postalCode: business.postal_code,
          country: business.country,
          invoicePrefix: business.invoice_prefix,
          bankName: business.bank_name,
          bankAccountNumber: business.bank_account_number,
          bankAccountName: business.bank_account_name,
        }}
      />
    </div>
  );
}
