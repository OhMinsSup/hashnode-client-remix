import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// api
import { getTagApi } from "~/api/tags/tag.server";

// components
import TagDetailInfoBox from "~/components/n/TagDetailInfoBox";
import TabRoutesTags from "~/components/n/TabRoutesTags";

// types
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const tag = args.params.tag?.toString();
  if (!tag) {
    throw new Response("Not Found", { status: 404 });
  }
  const { json: data } = await getTagApi(tag, {
    loaderArgs: args,
  });
  if (!data?.result) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({
    tagInfo: data?.result,
  });
};

export type nTagLoader = typeof loader;

export const meta: V2_MetaFunction<nTagLoader> = ({
  params,
  data,
  matches,
}) => {
  const tagInfo = data?.tagInfo ?? null;
  const title = `#${params.tag?.toString()} on Hashnode`;
  const description = `${tagInfo?.name} (${
    tagInfo?.followCount ?? 0
  } followers · ${
    tagInfo?.postCount ?? 0
  } posts) On Hashnode, you can follow your favorite topics and get notified when new posts are published.`;
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    { title },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
  ];
};

export default function NTagMainPage() {
  return (
    <div className="tag__list-container">
      <TagDetailInfoBox />
      <div className="tab-routes__container">
        <TabRoutesTags />
        <Outlet />
      </div>
    </div>
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
