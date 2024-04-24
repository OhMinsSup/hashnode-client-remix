import { json, redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { safeRedirect } from "remix-utils/safe-redirect";
import { readHeaderCookie } from "~/.server/utils/request.server";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

export const writeByIdLoader = async ({
  request,
  context,
  params,
}: LoaderFunctionArgs) => {
  const { id } = params;

  try {
    if (!id) {
      const error = new Error();
      error.name = "InvalidIdError";
      throw error;
    }

    const cookie = readHeaderCookie(request);
    if (!cookie) {
      const error = new Error();
      error.name = "InvalidCookieError";
      throw error;
    }

    const response = await context.agent.api.app.post.getOwnerByIdHandler<
      FetchRespSchema.Success<SerializeSchema.SerializePost>
    >(id, {
      headers: {
        Cookie: cookie,
      },
    });

    const data = response._data;
    if (!data) {
      const error = new Error();
      error.name = "GetPostError";
      error.message = "Failed to get post data with no data";
      throw error;
    }

    if (data.resultCode !== RESULT_CODE.OK) {
      const error = new Error();
      error.name = "GetPostError";
      error.message = "Failed to get post data with resultCode";
      throw error;
    }

    return json({
      status: "success" as const,
      result: data.result,
      errors: null,
      message: null,
    });
  } catch (error) {
    console.error(error);
    throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  }
};

export type RoutesLoaderData = typeof writeByIdLoader;
