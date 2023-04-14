import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// components
import TagDetailInfoBox from "~/components/n/TagDetailInfoBox";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const tag = args.params.tag?.toString();
  if (!tag) {
    return new Response("Not Found", { status: 404 });
  }
  console.log(args.params);
  return json({});
};

export type DataLoader = typeof loader;

export default function Tag() {
  return (
    <div className="tag__list-container">
      <div className="tag-detail-info-box">
        <TagDetailInfoBox />
      </div>
      <Outlet />
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
