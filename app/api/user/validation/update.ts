import { z } from 'zod'
import { HTTPError } from "ky-universal";
import { STATUS_CODE } from "~/constants/constant";
import { match, P } from "ts-pattern";
import type { ErrorAPI } from "~/api/schema/api";

export const userUpdateSocialSchema = z.object({
  github: z.string().url().regex(
    /(http|https):\/\/github\.com\/(.+)|(http|https):\/\/www\.github\.com\/(.+)/
  ).optional(),
  facebook: z.string().url().regex(
    /(http|https):\/\/facebook\.com\/(.+)|(http|https):\/\/www\.facebook\.com\/(.+)|(http|https):\/\/fb\.com\/(.+)|(http|https):\/\/www\.fb\.com\/(.+)/
  ).optional(),
  twitter: z.string().url().regex(
    /(http|https):\/\/twitter\.com\/(.+)|(http|https):\/\/www\.twitter\.com\/(.+)/
  ).optional(),
  instagram: z.string().url().regex(
    /(http|https):\/\/instagram\.com\/(.+)|(http|https):\/\/www\.instagram\.com\/(.+)/
  ).optional(),
  website: z.string().url().optional(),
})


export const userUpdateSchema = z.object({
  name: z.string().min(1).max(20),
  username: z.string().min(1).max(20),
  email: z.string().email(),
  tagline: z.string().max(255).optional(),
  avatarUrl: z.string().url().optional(),
  location: z.string().max(255).optional(),
  bio: z.string().max(255).optional(),
  skills: z.array(z.string()).max(10).optional(),
  availableText: z.string().max(140).optional(),
  socials: userUpdateSocialSchema.optional(),
});

export type UserUpdateBody = z.infer<typeof userUpdateSchema>;

/**
 * Signin error wrapper
 * @version 1.0.0
 * @description 태그 팔로우시 사용되는 스키마의 에러를 처리합니다.
 * @param {unknown} error
 * @returns {Record<string, string> | null}
 */
export const userUpdateValidationErrorWrapper = (error: unknown) => {
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
 * @description 태그 팔로우시 사용되는 HTTP 에러를 처리합니다.
 * @param {unknown} error
 * @returns {Promise<Record<string, string> | null>}
 */
export const userUpdateHTTPErrorWrapper = async (error: unknown) => {
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

      return {
        statusCode: resp.status,
        errors: state.errors,
      };
    } else {
      return {
        statusCode: resp.status,
        errors: {
          error: "알 수 없는 에러가 발생했습니다.",
        },
      };
    }
  }
  return null;
};
