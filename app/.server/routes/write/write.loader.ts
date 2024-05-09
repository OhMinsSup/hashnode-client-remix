import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { requireCookie } from "~/.server/utils/auth.server";
import { PAGE_ENDPOINTS } from "~/constants/constant";

type Data = FetchRespSchema.Success<FetchRespSchema.Id<string>>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const isNewDraft = searchParams.get("isNewDraft");
  const tag = searchParams.get("tag");
  const tags: string[] = tag ? tag.split(",") : [];

  try {
    const { cookie } = requireCookie(request);
    if (!cookie) {
      const error = new Error();
      error.name = "InvalidCookieError";
      error.message = "Failed to get cookie";
      throw error;
    }

    const draft = context.agent.api.app.draft;

    const response = await draft.postSyncDraftHandler<Data>({
      headers: {
        Cookie: cookie,
      },
      body: {
        tags,
        title: "Untitled",
        isNewDraft: isNewDraft ? isNewDraft === "true" : false,
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
      if (searchParams.has("isNewDraft")) {
        searchParams.delete("isNewDraft");
      }
      nextUrl += `?${searchParams.toString()}`;
    }
    return redirect(nextUrl);
  } catch (error) {
    console.error(error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
};

export type RoutesLoaderData = typeof loader;
