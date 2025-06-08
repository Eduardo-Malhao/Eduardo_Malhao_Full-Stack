import { z } from "zod";

export const Auth_Schema = z.object({

  email: z.string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),

  password: z.string({ required_error: "Senha é obrigatória" })
  .min(8, "A senha deve ter pelo menos 8 caracteres"),
});