import { defer, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/.server/utils/request.server";

export const feedsLayoutLoader = async ({
  context,
  request,
}: LoaderFunctionArgs) => {
  const cookie = readHeaderCookie(request);

  const commonHeaders = {
    headers: {
      ...(cookie && {
        Cookie: cookie,
      }),
      "Content-Type": "application/json",
    },
  };

  const getUsers = context.api.getUserListHandler(
    {
      limit: 4,
    },
    commonHeaders
  );

  const getTags = context.api.getTagListHandler(
    {
      limit: 4,
      type: "popular",
    },
    commonHeaders
  );

  return defer(
    {
      getUsers,
      getTags,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=120",
      },
    }
  );
};

export type RoutesLoaderData = typeof feedsLayoutLoader;
