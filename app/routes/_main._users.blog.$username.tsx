// provider
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import UserProfileBox from "~/components/users/UserProfileBox";
import { json } from "@remix-run/cloudflare";

// styles
import homeListStyle from "~/styles/routes/home-list.css";
import homeUsersStyles from "~/styles/routes/home-users.css";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: homeListStyle },
    { rel: "stylesheet", href: homeUsersStyles },
  ];
};

export const loader = async ({ context, request, params }: LoaderArgs) => {
  const username = params.username?.toString();
  if (!username) {
    throw new Response("Not Found", { status: 404 });
  }
  const { json: data } = await context.api.user.getUser(request, username);
  return json({
    userInfo: data?.result,
  });
};

export type MainUserLoader = typeof loader;

export default function MainUserPage() {
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
