import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const schema = z.object({
  q: z.string().optional(),
});

export const resolver = zodResolver(schema);

export type FormFieldValues = z.infer<typeof schema>;
