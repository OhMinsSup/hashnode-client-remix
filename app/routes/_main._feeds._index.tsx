import { Suspense } from "react";
import { json } from "@remix-run/cloudflare";
import {
  Await,
  isRouteErrorResponse,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";

// components
import { HashnodeList } from "~/components/shared/future/HashnodeList";
import { TrendingTagsBox } from "~/components/shared/future/TrendingTagsBox";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { Loader as MainLoader } from "~/routes/_main";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.post.getPostsByList(request);
  return json(response);
};

export type Loader = typeof loader;

export default function Routes() {
  // recent
  const data = useRouteLoaderData<MainLoader>("routes/_main");

  return (
    <HashnodeList
      trendingTags={
        <>
          <Suspense fallback={<></>}>
            <Await resolve={data?.trendingTag}>
              {(data) => <TrendingTagsBox />}
            </Await>
          </Suspense>
        </>
      }
      recommendedUsers={<></>}
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
