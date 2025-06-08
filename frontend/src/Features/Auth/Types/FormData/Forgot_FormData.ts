import { z } from "zod";
import type { Forgot_Schema } from "../../Validations";

export type Forgot_FormData = z.infer<typeof Forgot_Schema>;