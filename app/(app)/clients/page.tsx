import { ClientsPageShell } from "./ClientsPageShell";
import { requireWorkspaceContext } from "@/lib/queries/auth";
import { getClients } from "@/lib/queries/clients";

export default async function ClientsPage() {
  const { business } = await requireWorkspaceContext();
  const clients = await getClients(business.id);

  return <ClientsPageShell clients={clients} />;
}
