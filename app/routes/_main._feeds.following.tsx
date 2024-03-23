import {
  Await,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import { HashnodeList } from "~/components/shared/future/HashnodeList";
import { feedsLoader } from "~/.server/routes/feeds/feeds-loader.server";
import { RoutesLoaderData } from "~/.server/routes/feeds-layout/feeds-layout-loader.server";
import { Suspense } from "react";
import { TrendingTagsBox } from "~/components/shared/future/TrendingTagsBox";
import { RecommendedUsersBox } from "~/components/shared/future/RecommendedUsersBox";
import { isEmpty } from "~/utils/assertion";

export const loader = feedsLoader;

export default function Routes() {
  const data = useRouteLoaderData<RoutesLoaderData>("routes/_main._feeds");

  return (
    <HashnodeList
      trendingTags={
        <Suspense fallback={<></>}>
          <Await resolve={data?.getTags}>
            {(data) => {
              const result = data?.body?.result;
              const items = result?.list ?? [];
              if (isEmpty(items)) {
                return null;
              }
              return <TrendingTagsBox data={result} />;
            }}
          </Await>
        </Suspense>
      }
      recommendedUsers={
        <Suspense fallback={<></>}>
          <Await resolve={data?.getUsers}>
            {(data) => {
              const result = data?.body?.result;
              const items = result?.list ?? [];
              if (isEmpty(items)) {
                return null;
              }
              return <RecommendedUsersBox data={result} />;
            }}
          </Await>
        </Suspense>
      }
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
