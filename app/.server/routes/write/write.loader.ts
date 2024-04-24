import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { readHeaderCookie } from "~/.server/utils/request.server";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const writeLoader = async ({ request, context }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const tags: string[] = tag ? tag.split(",") : [];

  try {
    const cookie = readHeaderCookie(request);
    if (!cookie) {
      const error = new Error();
      error.name = "InvalidCookieError";
      throw error;
    }

    const response = await context.agent.api.app.draft.postSyncDraftHandler<
      FetchRespSchema.Success<FetchRespSchema.Id<string>>
    >({
      headers: {
        Cookie: cookie,
      },
      body: {
        tags,
        title: "Untitled",
      },
    });

    const data = response._data;
    if (!data) {
      const error = new Error();
      error.name = "CreateDraftError";
      error.message = "Failed to create draft data with no data";
      throw error;
    }

    const dataId = data.result.dataId;

    let nextUrl = safeRedirect(PAGE_ENDPOINTS.WRITE.ID(dataId));
    if (searchParams.size > 0) {
      nextUrl += `?${searchParams.toString()}`;
    }
    return redirect(nextUrl);
  } catch (error) {
    console.error(error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
};

export type RoutesLoaderData = typeof writeLoader;
