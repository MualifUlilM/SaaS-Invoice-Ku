import { z } from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama klien minimal 2 karakter.")
    .max(120, "Nama klien terlalu panjang."),
  companyName: z.string().trim().max(120, "Nama perusahaan terlalu panjang."),
  email: z.union([z.literal(""), z.email("Format email tidak valid.")]),
  phone: z.string().trim().max(30, "Nomor telepon terlalu panjang."),
  address: z.string().trim().max(300, "Alamat terlalu panjang."),
  notes: z.string().trim().max(500, "Catatan terlalu panjang."),
});

export type ClientInput = z.infer<typeof clientSchema>;
