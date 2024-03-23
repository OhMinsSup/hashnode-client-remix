import { defer, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { readHeaderCookie } from "~/server/utils/request.server";

export const widgetLoader = async ({
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

  const getLikeList = context.api.getLikePostListHandler(
    {
      limit: 4,
    },
    commonHeaders
  );

  const getDraftList = context.api.getDraftPostListHandler(
    {
      limit: 4,
    },
    commonHeaders
  );

  const notificationCount =
    context.api.getNotificationCountHandler(commonHeaders);

  return defer(
    {
      notificationCount: notificationCount,
      getDraftList: getDraftList,
      getLikeList: getLikeList,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=120",
      },
    }
  );
};

export type RoutesLoaderData = typeof widgetLoader;
