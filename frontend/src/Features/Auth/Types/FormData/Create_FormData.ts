import { z } from "zod";
import type { Create_Schema } from "../../Validations";

export type Create_FormData = z.infer<typeof Create_Schema>;