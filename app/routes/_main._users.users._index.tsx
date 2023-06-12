import { json, redirect } from "@remix-run/cloudflare";

// components
import PostsList from "~/components/shared/PostsList.unstable";

// utils
import { parseUrlParams } from "~/utils/util";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { LoaderArgs, ActionArgs } from "@remix-run/cloudflare";

export const loader = async ({ request, context }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = 25;
  if (params.limit) {
    limit = parseInt(params.limit);
  }

  const args = {
    cursor,
    limit,
    isDeleted: false,
  } as const;

  const { json: data } = await context.api.item.getMyItems(request, args);

  return json({
    posts: data?.result,
  });
};

export const action = async ({ request, context }: ActionArgs) => {
  switch (request.method) {
    case "DELETE": {
      return actionErrorWrapper(async () => {
        const { json: data } = await context.api.item.deleteItem(request);
        if (data.resultCode !== RESULT_CODE.OK) {
          const pathname = new URL(request.url).pathname;
          throw redirect(pathname || PAGE_ENDPOINTS.USERS.ROOT);
        }
        return json(data.result);
      });
    }
    default: {
      throw new Response("Method not allowed", { status: 405 });
    }
  }
};

export type UsersIndexLoader = typeof loader;

export default function Routes() {
  return <PostsList isMyItemPage />;
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
