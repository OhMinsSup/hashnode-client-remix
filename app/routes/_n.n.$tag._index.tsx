import React from "react";
// import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
// import { STATUS_CODE } from "~/constants/constant";

// types
// import type { LoaderArgs } from "@remix-run/cloudflare";
import { HashnodeList } from "~/components/shared/future/HashnodeList";

// export const loader = async ({ request, context, params }: LoaderArgs) => {
//   const tagName = params.tag?.toString();
//   if (!tagName) {
//     throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
//   }
//   let cursor = undefined;
//   if (params.cursor) {
//     cursor = parseInt(params.cursor);
//   }
//   let limit = undefined;
//   if (params.limit) {
//     limit = parseInt(params.limit);
//   }

//   const args = {
//     cursor,
//     limit,
//     type: "recent",
//     tag: tagName,
//   } as const;

//   const { json: data } = await context.api.item.getItems(request, args);
//   return json({
//     posts: data?.result,
//   });
// };

// export type nTagIndexLoader = typeof loader;

export default function Routes() {
  console.log("nTagIndex");
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
