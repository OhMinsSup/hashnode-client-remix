import { z } from 'zod';

export const schema = z.object({
  id: z.string().min(1).max(255),
});

export type FormFieldValues = z.infer<typeof schema>;
