export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions) {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  });

  return formatter.format(typeof date === "string" ? new Date(date) : date);
}

export function formatDateInput(date: string | Date) {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toISOString().slice(0, 10);
}
