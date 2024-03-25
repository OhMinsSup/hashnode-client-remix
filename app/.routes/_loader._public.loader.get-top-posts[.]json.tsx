import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/.server/utils/request.server";
import { parseUrlParams } from "~/utils/utils";

/**
 * @deprecated
 */
export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const params = parseUrlParams(request.url);
  const cookie = readHeaderCookie(request);
  const response = await context.api.getTopPostListHandler(params, {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  });
  const data = await response.body;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120, immutable",
    },
  });
};

/**
 * @deprecated
 */
export type RoutesLoaderData = typeof loader;

/**
 * @deprecated
 */
export const getPath = (duration: number | string) =>
  `/loader/get-top-posts.json?duration=${duration}`;
