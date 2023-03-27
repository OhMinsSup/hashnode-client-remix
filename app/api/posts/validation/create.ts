import { z } from "zod";
import { HTTPError } from "ky-universal";
import { STATUS_CODE } from "~/constants/constant";
import { match, P } from "ts-pattern";
import type { ErrorAPI } from "~/api/schema/api";

export const createPostSchema = z.object({
  title: z.string().max(100),
  subTitle: z.string().max(100).optional().nullable(),
  description: z.string().min(140).max(156),
  content: z.string(),
  thumbnail: z.object({
    idx: z.number().optional().nullable(),
    url: z.string().url(),
  }),
  tags: z.array(z.string()).max(5).nullable().optional(),
  disabledComment: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  hasPublishedTime: z.boolean().optional(),
  publishingDate: z.date().min(new Date()).optional().nullable(),
});

/**
 * Signin error wrapper
 * @version 1.0.0
 * @description 포스트 작성시 사용되는 스키마의 에러를 처리합니다.
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const postValidationErrorWrapper = (error: unknown) => {
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
 * @description 포스트 작성시 사용되는 스키마의 에러를 처리합니다. (HTTPError)
 * @param {unknown} error
 * @returns {Promise<Record<string, string> | null>}
 */
export const postHTTPErrorWrapper = async (error: unknown) => {
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
