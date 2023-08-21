// provider
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import UserProfileBox from "~/components/users/UserProfileBox";
import { json } from "@remix-run/cloudflare";

// styles
import homeListStyle from "~/styles/routes/home-list.css";
import homeUsersStyles from "~/styles/routes/home-users.css";

// types
import type { LoaderArgs, LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: homeListStyle },
    { rel: "stylesheet", href: homeUsersStyles },
  ];
};

export const loader = async ({ context, request, params }: LoaderArgs) => {
  const response = await context.api.user.usernameByUser(params, request);
  if (response instanceof Response) throw response;
  return json(response);
};

export type Loader = typeof loader;

export default function Routes() {
  return (
    <div className="relative col-span-7 min-w-0 pb-5 pt-5">
      <div className="content-info-box">
        <UserProfileBox />
      </div>
      <div className="overflow-hidden rounded-lg border bg-white">
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
