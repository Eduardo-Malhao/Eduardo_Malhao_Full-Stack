import { z } from "zod";
import type { Password_Schema } from "../../Validations";

export type Password_FormData = z.infer<typeof Password_Schema>;