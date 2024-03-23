import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";
import { parseUrlParams } from "~/utils/util";
import merge from "lodash-es/merge";

export const feedsLoader = async ({ context, request }: LoaderFunctionArgs) => {
  const cookie = readHeaderCookie(request);

  const defaultValues = {
    limit: 10,
  };
  const nextValues = parseUrlParams(request.url);
  const params = merge(defaultValues, nextValues);

  const commonHeaders = {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  };

  const { body } = await context.api.getPostListHandler(params, commonHeaders);

  const data: Awaited<
    FetchRespSchema.Success<
      FetchRespSchema.ListResp<FetchRespSchema.PostDetailResp>
    >
  > = await body;

  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=120",
    },
  });
};

export type RoutesLoaderData = typeof feedsLoader;
