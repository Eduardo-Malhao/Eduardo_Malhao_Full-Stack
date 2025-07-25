import { z } from "zod";

export const Password_Schema = z.object({
  actual_password: z.string({ required_error: "Senha atual é obrigatória" })
    .min(1, "Senha atual é obrigatória"),

  new_password: z.string({ required_error: "Nova senha é obrigatória" })
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos 1 letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos 1 número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos 1 caractere especial"),

  confirm_new_password: z.string({ required_error: "Confirmação da senha é obrigatória" })
})
  .refine(data => data.new_password === data.confirm_new_password, {
    message: "As senhas não coincidem",
    path: ["confirm_new_password"]
  })

  .refine(data => data.new_password !== data.actual_password, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["new_password"]
  });