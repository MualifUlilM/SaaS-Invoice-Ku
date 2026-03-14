import type { InvoiceDiscountType } from "@/lib/database.types";

interface InvoiceItemAmount {
  quantity: number;
  unitPriceAmount: number;
}

export function calculateInvoiceSubtotal(items: InvoiceItemAmount[]) {
  return items.reduce((total, item) => total + item.quantity * item.unitPriceAmount, 0);
}

export function calculateInvoiceDiscountAmount(
  subtotal: number,
  discountType: InvoiceDiscountType,
  discountValue: number,
) {
  const normalizedDiscountValue = Math.max(discountValue, 0);

  if (discountType === "percentage") {
    return Math.round((subtotal * normalizedDiscountValue) / 100);
  }

  return Math.round(normalizedDiscountValue);
}

export function calculateInvoiceTotals(
  items: InvoiceItemAmount[],
  discountType: InvoiceDiscountType,
  discountValue: number,
  taxAmount: number,
) {
  const subtotalAmount = calculateInvoiceSubtotal(items);
  const discountAmount = calculateInvoiceDiscountAmount(
    subtotalAmount,
    discountType,
    discountValue,
  );
  const normalizedTaxAmount = Math.max(Math.round(taxAmount), 0);

  return {
    subtotalAmount,
    discountAmount,
    taxAmount: normalizedTaxAmount,
    totalAmount: Math.max(subtotalAmount - discountAmount + normalizedTaxAmount, 0),
  };
}
