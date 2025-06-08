import { z } from "zod";
import type { Edit_User_Schema } from "../../Validations";

export type Edit_User_FormData = z.infer<typeof Edit_User_Schema>;