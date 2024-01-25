import { Suspense } from "react";
import { defer } from "@remix-run/cloudflare";

// components
import { HashnodeContainer } from "~/components/shared/future/HashnodeContainer";
import { HashnodeTabs } from "~/components/shared/future/HashnodeTabs";
import { TrendingTagsBox } from "~/components/shared/future/TrendingTagsBox";
import { RecommendedUsersBox } from "~/components/shared/future/RecommendedUsersBox";

// provider
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
  Await,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = ({ context, request }: LoaderFunctionArgs) => {
  return defer({
    trendingUser: context.api.widget.getWidgetTrendingUserList(request),
    trendingTag: context.api.widget.getWidgetTrendingTagList(request),
  });
};

export type RoutesLoader = typeof loader;

export default function Routes() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <HashnodeContainer>
      <HashnodeTabs>
        <div className="space-y-4">
          <Suspense fallback={<></>}>
            <Await resolve={data?.trendingTag}>
              {(data) => <TrendingTagsBox data={data} />}
            </Await>
          </Suspense>
          <Suspense fallback={<></>}>
            <Await resolve={data?.trendingUser}>
              {(data) => <RecommendedUsersBox data={data} />}
            </Await>
          </Suspense>
          <Outlet />
        </div>
      </HashnodeTabs>
    </HashnodeContainer>
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
