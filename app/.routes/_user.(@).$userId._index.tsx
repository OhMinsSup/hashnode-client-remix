// provider
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { UserBlockTags } from "~/components/users/future/UserBlockTags";
import { UserFooter } from "~/components/users/future/UserFooter";
import { UserRecentActivity } from "~/components/users/future/UserRecentActivity";
import { UsersHeader } from "~/components/users/future/UsersHeader";
import { defer } from "@remix-run/cloudflare";

// types
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = async ({
  context,
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await context.api.user.getByUser({ id: params.userId }, request);
  return defer({
    ...data,
    historiesPromise: context.api.user.getByUserHistories(
      { id: params.userId },
      request
    ),
  });
};

export type RoutesLoader = typeof loader;

export default function Routes() {
  return (
    <>
      <UsersHeader />
      <UserBlockTags />
      <UserRecentActivity />
      <UserFooter />
    </>
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
