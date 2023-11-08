import { z } from "zod";

export const schema = z.object({
  username: z.string().min(1).max(20),
});

export type FormFieldValues = z.infer<typeof schema>;
