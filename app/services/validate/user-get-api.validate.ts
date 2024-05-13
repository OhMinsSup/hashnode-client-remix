import { z } from 'zod';

export const schema = z.object({
  id: z
    .string()
    .min(1)
    .transform((v) => {
      // 첫번째에 "@" 문자가 있으면 제거 (ex: @username)
      if (v.startsWith('@')) {
        return v.slice(1);
      }
      return v;
    }),
});

export type FormFieldValues = z.infer<typeof schema>;
