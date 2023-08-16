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

import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import type { Loader as MainLoader } from "~/routes/_main";

export const loader = async ({ context, request }: LoaderArgs) => {
  const response = await context.api.item.getItemsByList(request, "featured");
  return json(response);
};

export type Loader = typeof loader;

export const meta: V2_MetaFunction<Loader> = ({ data, matches }) => {
  const title = "Featured posts on Hashnode";
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "og:title" &&
      meta.name !== "twitter:title" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "twitter:title",
      content: title,
    },
  ];
};

export default function Routes() {
  const data = useRouteLoaderData<MainLoader>("routes/_main");

  return (
    <HashnodeList
      trendingTags={
        <Suspense fallback={<></>}>
          <Await resolve={data?.trendingTag}>
            {(data) => <TrendingTagsBox />}
          </Await>
        </Suspense>
      }
    />
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
