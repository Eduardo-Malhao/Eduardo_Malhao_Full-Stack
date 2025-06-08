import { z } from "zod";
import type { Profile_Schema } from "../../Validations";

export type Profile_FormData = z.infer<typeof Profile_Schema>;