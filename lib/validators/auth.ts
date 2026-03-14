import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Format email tidak valid."),
  password: z.string().min(6, "Password minimal 6 karakter."),
});

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Nama minimal 2 karakter.")
      .max(100, "Nama terlalu panjang."),
    email: z.email("Format email tidak valid."),
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z.string().min(8, "Konfirmasi password wajib diisi."),
    agreeTerms: z.boolean().refine((value) => value, {
      message: "Anda harus menyetujui Terms of Service.",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email("Format email tidak valid."),
  origin: z.url("Origin tidak valid."),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password minimal 8 karakter."),
    confirmPassword: z.string().min(8, "Konfirmasi password wajib diisi."),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password tidak cocok.",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
