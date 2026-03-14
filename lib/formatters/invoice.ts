export function formatInvoiceSequence(sequence: number) {
  return sequence.toString().padStart(4, "0");
}

export function buildInvoiceNumber(prefix: string, sequence: number) {
  const normalizedPrefix = prefix.trim().toUpperCase();
  return `${normalizedPrefix}-${formatInvoiceSequence(sequence)}`;
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}
