interface ClientIdentity {
  name: string | null;
  company_name: string | null;
}

function normalize(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getClientName(client: ClientIdentity | null | undefined) {
  return normalize(client?.name) ?? "-";
}

export function getClientCompany(client: ClientIdentity | null | undefined) {
  return normalize(client?.company_name);
}

export function formatClientOptionLabel(client: ClientIdentity) {
  const name = normalize(client.name);
  const company = normalize(client.company_name);

  if (name && company) {
    return `${name} - ${company}`;
  }

  return name ?? company ?? "-";
}
