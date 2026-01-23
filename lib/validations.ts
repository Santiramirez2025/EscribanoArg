import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida").min(6, "Mínimo 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").min(2, "Mínimo 2 caracteres"),
  email: z.string().min(1, "El email es requerido").email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida").min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
  phone: z.string().optional(),
  role: z.enum(["CLIENTE", "ESCRIBANO"]).default("CLIENTE"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
