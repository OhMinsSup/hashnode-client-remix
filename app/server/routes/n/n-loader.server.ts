import { json, redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";
import { parseUrlParams } from "~/utils/util";
import merge from "lodash-es/merge";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const nLoader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  const tag = params.tag?.toString();
  if (!tag) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }

  const cookie = readHeaderCookie(request);

  const defaultValues = {
    limit: 10,
    tag,
  };
  const nextValues = parseUrlParams(request.url);
  const input = merge(defaultValues, nextValues);

  console.log("input", input);

  const commonHeaders = {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  };

  const { body } = await context.api.getPostListHandler(input, commonHeaders);

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

export type RoutesLoaderData = typeof nLoader;
