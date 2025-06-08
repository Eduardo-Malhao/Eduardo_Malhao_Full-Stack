import { z } from "zod";

export const Create_Schema = z.object({

  first_name: z.string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome deve ter pelo menos 1 caracter"),

  last_name: z.string({ required_error: "Sobrenome é obrigatório" })
    .min(1, "Sobrenome deve ter pelo menos 1 caracter"),

  email: z.string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),

  password: z.string({ required_error: "Nova senha é obrigatória" })
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos 1 letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos 1 letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos 1 número")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos 1 caractere especial"),

  confirm_password: z.string({ required_error: "Confirmação da senha é obrigatória" })
})
  .refine(data => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"]
  })