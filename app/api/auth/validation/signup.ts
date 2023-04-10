import { z } from "zod";
import { HTTPError } from "ky-universal";
import { STATUS_CODE } from "~/constants/constant";
import { match, P } from "ts-pattern";

import type { ErrorAPI } from "~/api/schema/api";

/**
 * Signup schema
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

/**
 * Signup error wrapper
 * @version 1.0.0
 * @description 회원가입 시 사용되는 스키마의 에러를 처리합니다.
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const signupValidationErrorWrapper = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const errors: Record<string, string> = {};
    error.issues.reduce((acc, cur) => {
      const key = cur.path.at(0);
      if (!key) return acc;
      acc[key] = cur.message;
      return acc;
    }, errors);
    return errors;
  }
  return null;
};

/**
 * Signup error wrapper
 * @version 1.0.0
 * @description 회원가입 시 사용되는 스키마의 에러를 처리합니다. (HTTPError)
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const signupHTTPErrorWrapper = async (error: unknown) => {
  if (error instanceof HTTPError) {
    const resp = error.response;
    const data = await resp.json<ErrorAPI>();

    if (resp.status === STATUS_CODE.BAD_REQUEST) {
      const errorKey = data.error;
      const state = match(data.message)
        .with(P.array(P.string), (data) => ({
          errors: {
            [errorKey]: data[0],
          },
        }))
        .with(P.string, (data) => ({
          errors: {
            [errorKey]: data,
          },
        }))
        .exhaustive();

      return state;
    }

    return null;
  }
};
