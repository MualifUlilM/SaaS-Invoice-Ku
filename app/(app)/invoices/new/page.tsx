import { FileText } from "lucide-react";
import { EmptyState } from "@/components/app/EmptyState";
import { InvoiceForm } from "@/components/app/InvoiceForm";
import { PageHeader } from "@/components/app/PageHeader";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getActiveClients } from "@/lib/queries/clients";

export default async function NewInvoicePage() {
  const { business } = await requireWorkspaceContext();
  const clients = await getActiveClients(business.id);

  // Build default payment instructions from business bank details
  const defaultPaymentInstructions = [
    business.bank_name && `Bank: ${business.bank_name}`,
    business.bank_account_number && `No. Rekening: ${business.bank_account_number}`,
    business.bank_account_name && `A/N: ${business.bank_account_name}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Invoice Baru"
        title="Buat Invoice Baru"
        description="Pilih klien, susun item tagihan, dan simpan invoice dalam beberapa langkah singkat."
      />

      {clients.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Tambahkan klien terlebih dahulu"
          description="Invoice membutuhkan klien sebagai penerima. Simpan data klien baru sebelum membuat invoice."
          ctaHref="/clients"
          ctaLabel="Kelola Klien"
        />
      ) : (
        <InvoiceForm
          clients={clients}
          defaultPaymentInstructions={defaultPaymentInstructions || undefined}
        />
      )}
    </div>
  );
}
