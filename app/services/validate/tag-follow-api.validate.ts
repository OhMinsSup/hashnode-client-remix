import { z } from "zod";

export const schema = z.object({
  slug: z.string().min(1),
});

export type FormFieldValues = z.infer<typeof schema>;
