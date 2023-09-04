// provider
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { UserBlockTags } from "~/components/users/future/UserBlockTags";
import { UserFooter } from "~/components/users/future/UserFooter";
import { UsersHeader } from "~/components/users/future/UsersHeader";
// import { json } from "@remix-run/cloudflare";

// types
// import type { LoaderArgs } from "@remix-run/cloudflare";

// export const loader = async ({ context, request, params }: LoaderArgs) => {
//   const response = await context.api.user.usernameByUser(params, request);
//   if (response instanceof Response) throw response;
//   return json(response);
// };

// export type Loader = typeof loader;

export default function Routes() {
  return (
    <>
      <UsersHeader />
      <UserBlockTags />
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
