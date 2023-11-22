import { z } from "zod";

/**
 * Signup schema
 * @version 2023-08-17
 * @description 회원가입 시 사용되는 스키마입니다.
 */
export const schema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters long",
      })
      .max(20, {
        message: "Username must be at most 20 characters long",
      }),
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{6,10}$/, {
        message:
          "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter",
      }),
    nickname: z.string().optional(),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{6,10}$/, {
        message:
          "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type FormFieldValues = z.infer<typeof schema>;
