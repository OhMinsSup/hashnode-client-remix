import React from "react";

// provider
import { Outlet, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import UserProfileBox from "~/components/users/UserProfileBox";
import { LoaderArgs, json } from "@remix-run/cloudflare";
import { getUserApi } from "~/api/user/user.server";

// styles
import styles from "~/styles/routes/home-users.css";

// types
import type { LinksFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};


export const loader = async (args: LoaderArgs) => {
  const username = args.params.username?.toString();
  if (!username) {
    throw new Response("Not Found", { status: 404 });
  }
  const { json: data } = await getUserApi(username, {
    loaderArgs: args,
  });
  if (!data?.result) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({
    userInfo: data?.result,
  });
};

export type UserLoader = typeof loader;

export default function MainUserPage() {
  const { userInfo } = useLoaderData<UserLoader>();
  console.log(userInfo);
  return (
    <div className="relative col-span-7 min-w-0 pb-5 pt-5">
      <div className="content-info-box">
        <h1>{userInfo.username}</h1>
        <p>{userInfo.profile?.tagline}</p>
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
