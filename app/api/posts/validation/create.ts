import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().max(255),
  subTitle: z.string().max(255).optional().nullable(),
  content: z.string(),
  thumbnail: z.object({
    idx: z.number().optional().nullable(),
    url: z.string().url().optional().nullable(),
  }),
  disabledComment: z.boolean().optional(),
  // isoDate 값으로 넘어온다.
  publishingDate: z
    .date()
    .optional()
    .nullable()
    .refine((date) => {
      if (!date) {
        return true;
      }
      const now = new Date();
      const diff = date.getTime() - now.getTime();
      return diff > 0;
    }),
  tags: z.array(z.string()).max(5).nullable().optional(),
  seo: z
    .object({
      title: z.string().max(50).optional().nullable(),
      desc: z.string().max(156).optional().nullable(),
      // image: z.string().url().optional().nullable(),
      image: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type CreatePostBody = z.infer<typeof createPostSchema>;
