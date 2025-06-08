import { z } from "zod";
import type { Auth_Schema } from "../../Validations/Auth_Schema";

export type Auth_FormData = z.infer<typeof Auth_Schema>;