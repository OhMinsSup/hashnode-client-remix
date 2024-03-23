import { redirect, type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { readHeaderCookie } from "~/server/utils/request.server";

export const nLayoutLoader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  const tagName = params.tag?.toString();
  if (!tagName) {
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }

  const cookie = readHeaderCookie(request);

  const commonHeaders = {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  };

  const response = await context.api.getTagHandler(tagName, commonHeaders);
  const body: Awaited<FetchRespSchema.Success<FetchRespSchema.TagDetailResp>> =
    await response.body;

  return json(body, {
    headers: {
      "Cache-Control": "public, max-age=120",
    },
  });
};

export type RoutesLoaderData = typeof nLayoutLoader;
