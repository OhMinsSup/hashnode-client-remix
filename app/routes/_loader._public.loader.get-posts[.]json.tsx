import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";
import { parseUrlParams } from "~/utils/util";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const params = parseUrlParams(request.url);
  const cookie = readHeaderCookie(request);
  const response = await context.api.getPostListHandler(params, {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  });
  const data: Awaited<
    FetchRespSchema.Success<
      FetchRespSchema.ListResp<FetchRespSchema.PostDetailResp>
    >
  > = await response.body;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120, immutable",
    },
  });
};

export type RoutesLoaderData = typeof loader;

export const getPath = (duration: number | string) =>
  `/loader/get-posts.json?duration=${duration}`;
