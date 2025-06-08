import { z } from "zod";

export const Forgot_Schema = z.object({

  email: z.string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),
});