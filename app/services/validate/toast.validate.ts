import { z } from 'zod'
import { createId as cuid } from '@paralleldrive/cuid2'

export const typeSchema = z.enum(['message', 'success', 'error']);

export const schema = z.object({
	id: z.string().default(() => cuid()),
	title: z.string().optional(),
    description: z.string(),
	type: typeSchema.default('message'),
});

export type Toast = z.infer<typeof schema>;

export type OptionalToast = Omit<Toast, 'id' | 'type'> & {
	id?: string
	type?: z.infer<typeof typeSchema>
}