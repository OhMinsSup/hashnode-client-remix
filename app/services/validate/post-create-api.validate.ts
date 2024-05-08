import { z } from "zod";

export const schema = z.object({
  urlSlug: z.string().max(255),
  title: z.string().max(200),
  subTitle: z.string().max(120).optional(),
  content: z.string().min(1),
  meta: z.record(z.unknown()).optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string().min(1)).optional(),
  seo: z.object({
    title: z.string().max(70).optional(),
    description: z.string().max(156).optional(),
    image: z.string().url().optional(),
  }),
  config: z.object({
    disabledComment: z.boolean().optional(),
    hiddenArticle: z.boolean().optional(),
    hasTableOfContents: z.boolean().optional(),
    isDraft: z.boolean().optional(),
    isMarkdown: z.boolean().optional(),
    publishedAt: z.string().optional(),
  }),
});

export type FormFieldValues = z.infer<typeof schema>;
