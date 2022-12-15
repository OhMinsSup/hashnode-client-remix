import { z } from "zod";
import { HTTPError } from "ky-universal";
import { STATUS_CODE } from "~/constants/constant";
import { match, P } from "ts-pattern";

import type { ErrorAPI } from "~/api/schema/api";

/**
 * Signin schema
 * @version 1.0.0
 * @description 로그인 시 사용되는 스키마입니다.
 */
export const signinSchema = z
  .object({
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/, {
        message:
          "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
      }),
  })
  .required();

/**
 * Signin error wrapper
 * @version 1.0.0
 * @description 로그인 시 사용되는 스키마의 에러를 처리합니다.
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const signinValidationErrorWrapper = (error: unknown) => {
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
 * Signin error wrapper
 * @version 1.0.0
 * @description 로그인 시 사용되는 스키마의 에러를 처리합니다. (HTTPError)
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const signinHTTPErrorWrapper = async (error: unknown) => {
  if (error instanceof HTTPError) {
    const resp = error.response;
    const data = await resp.json<ErrorAPI>();
    const checkStatusCode = [
      STATUS_CODE.BAD_REQUEST,
      STATUS_CODE.NOT_FOUND,
    ] as number[];

    if (checkStatusCode.includes(resp.status)) {
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
