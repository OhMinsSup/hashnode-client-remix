import { z } from "zod";

export const draftSchema = z.object({
  title: z.string().optional().nullable(),
  subTitle: z.string().optional().nullable(),
  content: z.string(),
  thumbnail: z
    .object({
      idx: z.number().optional().nullable(),
      url: z.string().url().optional().nullable(),
    })
    .optional()
    .nullable(),
  disabledComment: z.boolean().optional(),
  publishingDate: z.date().optional().nullable(),
  tags: z.array(z.string()).nullable().optional(),
  seo: z
    .object({
      title: z.string().optional().nullable(),
      desc: z.string().optional().nullable(),
      image: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type DraftBody = z.infer<typeof draftSchema>;
