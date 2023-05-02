import { z } from "zod";
import { createPostSchema } from "./create";

export const updatePostSchema = createPostSchema.merge(
  z.object({
    id: z.number().positive(),
    title: createPostSchema.pick({ title: true }).optional().nullable(),
    content: createPostSchema.pick({ content: true }).optional().nullable(),
  })
);
export type UpdatePostBody = z.infer<typeof updatePostSchema>;
