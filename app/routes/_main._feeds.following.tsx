import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import { HashnodeList } from "~/components/shared/future/HashnodeList";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const response = await context.api.post.getPostList(request);
  return json(response);
};

export type Loader = typeof loader;

export const meta: MetaFunction<Loader> = ({ data, matches }) => {
  const title = "Following posts on Hashnode";
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta: any) =>
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
  return <HashnodeList />;
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
