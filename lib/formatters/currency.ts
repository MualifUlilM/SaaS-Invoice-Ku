export function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseCurrencyInput(value: string) {
  const numeric = value.replace(/[^\d]/g, "");
  return Number(numeric || 0);
}
