import { z } from "zod";

export const businessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama bisnis minimal 2 karakter.")
    .max(120, "Nama bisnis terlalu panjang."),
  email: z.union([z.literal(""), z.email("Format email tidak valid.")]),
  phone: z.string().trim().max(30, "Nomor telepon terlalu panjang."),
  address: z.string().trim().max(300, "Alamat terlalu panjang."),
  city: z.string().trim().max(120, "Kota terlalu panjang."),
  province: z.string().trim().max(120, "Provinsi terlalu panjang."),
  postalCode: z.string().trim().max(20, "Kode pos terlalu panjang."),
  country: z.string().trim().min(2).max(60),
  invoicePrefix: z
    .string()
    .trim()
    .toUpperCase()
    .min(2, "Prefix invoice minimal 2 karakter.")
    .max(8, "Prefix invoice maksimal 8 karakter.")
    .regex(/^[A-Z0-9]+$/, "Prefix invoice hanya boleh huruf dan angka."),
  bankName: z.string().trim().max(60, "Nama bank terlalu panjang.").optional().default(""),
  bankAccountNumber: z.string().trim().max(50, "Nomor rekening terlalu panjang.").optional().default(""),
  bankAccountName: z.string().trim().max(120, "Nama pemilik rekening terlalu panjang.").optional().default(""),
});

export type BusinessInput = z.infer<typeof businessSchema>;
