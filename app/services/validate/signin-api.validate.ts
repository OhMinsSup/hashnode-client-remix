import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const schema = z.object({
  email: z.string().email({
    message: '잘못된 이메일 형식입니다. 이메일을 확인해주세요.',
  }),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{6,10}$/, {
      message: '비밀번호는 6~10자리의 영문, 숫자, 특수문자 조합이어야 합니다.',
    }),
});

export const resolver = zodResolver(schema);

export type FormFieldValues = z.infer<typeof schema>;
