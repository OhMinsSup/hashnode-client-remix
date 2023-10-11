import { z } from "zod";

export const schema = z.object({
  title: z.string().max(150).optional().nullable(),
  subTitle: z.string().max(150).optional().nullable(),
  content: z.string(),
  thumbnail: z
    .object({
      id: z.string().optional().nullable(),
      url: z.string().url().optional().nullable(),
    })
    .optional()
    .nullable(),
  disabledComment: z.boolean().optional(),
  tableOfContents: z.boolean().optional(),
  publishingDate: z.date().optional().nullable(),
  tags: z.array(z.string()).nullable().optional(),
  seo: z
    .object({
      title: z.string().max(70).optional().nullable(),
      desc: z.string().max(156).optional().nullable(),
      image: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
});

export type FormFieldValues = z.infer<typeof schema>;
