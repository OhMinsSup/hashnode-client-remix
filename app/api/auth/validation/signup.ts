import { z } from "zod";

/**
 * Signup schema
 * @deprecated
 * @version 1.0.0
 * @description 회원가입 시 사용되는 스키마입니다.
 */
export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: "Username must be at least 3 characters long",
      })
      .max(20, {
        message: "Username must be at most 20 characters long",
      }),
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
      }),
    name: z.string().optional(),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type SignupBody = z.infer<typeof signupSchema>;
