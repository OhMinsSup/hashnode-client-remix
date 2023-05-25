import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// utils
import { parseUrlParams } from "~/utils/util";

// components
import PostsList from "~/components/shared/PostsList.unstable";

import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const args = {
    cursor,
    limit,
    type: "featured",
  } as const;

  const { json: data } = await context.api.item.getItems(request, args);

  return json({
    posts: data?.result,
  });
};

export type MainFeedsFeaturedLoader = typeof loader;

export const meta: V2_MetaFunction<MainFeedsFeaturedLoader> = ({
  data,
  matches,
}) => {
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

export default function MainFeedsFeaturedPage() {
  return <PostsList />;
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
