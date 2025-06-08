import { z } from "zod";
import type { Reset_Schema } from "../../Validations";

export type Reset_FormData = z.infer<typeof Reset_Schema>;