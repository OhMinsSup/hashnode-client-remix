import { z } from "zod";

/**
 * Signin schema
 * @version 1.0.0
 * @description 로그인 시 사용되는 스키마입니다.
 */
export const signinSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address",
  }),
  password: z
    .string()
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
      message:
        "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
    }),
});

export type SigninBody = z.infer<typeof signinSchema>;
