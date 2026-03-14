import { z } from "zod";
import { calculateInvoiceDiscountAmount, calculateInvoiceSubtotal } from "@/lib/invoice-calculations";

export const invoiceItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(2, "Deskripsi item minimal 2 karakter.")
    .max(250, "Deskripsi item terlalu panjang."),
  quantity: z.number().positive("Qty harus lebih dari 0."),
  unitPriceAmount: z.number().min(0, "Harga tidak boleh negatif."),
});

export const invoiceSchema = z
  .object({
    clientId: z.string().uuid("Klien wajib dipilih."),
    issueDate: z.string().min(1, "Tanggal invoice wajib diisi."),
    dueDate: z.string().min(1, "Tanggal jatuh tempo wajib diisi."),
    discountType: z.enum(["fixed", "percentage"]),
    discountValue: z.number().min(0, "Diskon tidak boleh negatif."),
    taxAmount: z.number().min(0, "Pajak tidak boleh negatif."),
    notes: z.string().trim().max(1200, "Catatan terlalu panjang."),
    paymentInstructions: z
      .string()
      .trim()
      .max(1200, "Instruksi pembayaran terlalu panjang."),
    items: z.array(invoiceItemSchema).min(1, "Minimal satu item invoice."),
  })
  .refine((value) => new Date(value.dueDate) >= new Date(value.issueDate), {
    message: "Tanggal jatuh tempo harus setelah tanggal invoice.",
    path: ["dueDate"],
  })
  .superRefine((value, ctx) => {
    const subtotal = calculateInvoiceSubtotal(value.items);
    const discountAmount = calculateInvoiceDiscountAmount(
      subtotal,
      value.discountType,
      value.discountValue,
    );

    if (value.discountType === "percentage" && value.discountValue > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Diskon persentase maksimal 100%.",
        path: ["discountValue"],
      });
    }

    if (value.discountType === "fixed" && discountAmount > subtotal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Diskon tetap tidak boleh melebihi subtotal.",
        path: ["discountValue"],
      });
    }
  });

export type InvoiceItemInput = z.infer<typeof invoiceItemSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
