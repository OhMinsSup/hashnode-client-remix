// import { json, redirect } from "@remix-run/cloudflare";

// components
// import PostsList from "~/components/shared/PostsList.unstable";

// utils
// import { parseUrlParams } from "~/utils/util";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
// import { actionErrorWrapper } from "~/api/validation/errorWrapper";
// import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
// import type { LoaderArgs, ActionArgs } from "@remix-run/cloudflare";
import { HashnodeList } from "~/components/shared/future/HashnodeList";

// export const loader = async ({ request, context }: LoaderArgs) => {
//   const params = parseUrlParams(request.url);
//   let cursor = undefined;
//   if (params.cursor) {
//     cursor = parseInt(params.cursor);
//   }
//   let limit = 25;
//   if (params.limit) {
//     limit = parseInt(params.limit);
//   }

//   const args = {
//     cursor,
//     limit,
//     isDeleted: false,
//   } as const;

//   const { json: data } = await context.api.item.getMyItems(request, args);

//   return json({
//     posts: data?.result,
//   });
// };

// export const action = async ({ request, context }: ActionArgs) => {
//   switch (request.method) {
//     case "DELETE": {
//       return actionErrorWrapper(async () => {
//         const { json: data } = await context.api.item.deleteItem(request);
//         if (data.resultCode !== RESULT_CODE.OK) {
//           const pathname = new URL(request.url).pathname;
//           throw redirect(pathname || PAGE_ENDPOINTS.USERS.ROOT);
//         }
//         return json(data.result);
//       });
//     }
//     default: {
//       throw new Response("Method not allowed", { status: 405 });
//     }
//   }
// };

// export type Loader = typeof loader;

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
