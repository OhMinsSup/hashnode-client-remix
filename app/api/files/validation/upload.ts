import { z } from "zod";

export const uploadSchema = z.object({
  file: z.instanceof(File),
  uploadType: z.enum(["PROFILE", "IMAGE", "POST_THUMBNAIL"]),
  mediaType: z.enum(["IMAGE"]).default("IMAGE"),
});

export type UploadBody = z.infer<typeof uploadSchema>;
