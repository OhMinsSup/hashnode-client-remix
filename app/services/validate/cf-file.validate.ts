import { z } from "zod";

/**
 * Signin schema
 * @version 2023-08-17
 */
export const schema = z.object({
  file: z.instanceof(File),
  uploadType: z
    .enum(["PROFILE", "IMAGE", "POST_THUMBNAIL", "SEO"])
    .default("IMAGE")
    .optional(),
  mediaType: z.enum(["IMAGE"]).default("IMAGE").optional(),
});

export type FormFieldValues = z.infer<typeof schema>;
