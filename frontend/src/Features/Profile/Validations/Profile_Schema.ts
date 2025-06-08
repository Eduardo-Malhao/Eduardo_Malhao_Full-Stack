import { z } from "zod";

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE = 30 * 1024 * 1024;

export const Profile_Schema = z.object({
  id: z.number().optional(),

  email: z.string({ required_error: "Email é obrigatório" })
    .email("Email inválido"),

  first_name: z.string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome deve ter pelo menos 1 caracter"),

  last_name: z.string({ required_error: "Sobrenome é obrigatório" })
    .min(1, "Sobrenome deve ter pelo menos 1 caracter"),

  avatar: z.union([
    z.literal(''),
    z.string().url(), // avatar já salvo
    z.instanceof(File) // novo upload
  ])
  .optional()
  .refine((value) => {
    if (!value) return true;

    if (typeof value === 'string') {
      return true; // URL ok
    }

    if (value instanceof File) {
      return ACCEPTED_FILE_TYPES.includes(value.type) && value.size <= MAX_FILE_SIZE;
    }

    return false;
  }, {
    message: 'Avatar deve ser uma imagem JPG, JPEG ou PNG com até 30MB'
  })
});


export type Profile_FormData = z.infer<typeof Profile_Schema>;