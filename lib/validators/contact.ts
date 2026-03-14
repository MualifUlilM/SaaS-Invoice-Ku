import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama wajib diisi."),
  email: z.email("Format email tidak valid."),
  topic: z.string().trim().min(1, "Pilih topik pertanyaan."),
  message: z
    .string()
    .trim()
    .min(20, "Pesan minimal 20 karakter.")
    .max(3000, "Pesan terlalu panjang."),
});

export type ContactInput = z.infer<typeof contactSchema>;
