import classNames from "classnames";

// components
import { Icons } from "~/components/shared/Icons";

// remix
import { Outlet, useLocation } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";

import { useMemo } from "react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// api
import { getSessionApi } from "~/api/user/user";

// styles
import authStyles from "~/styles/routes/auth.css";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
});

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  if (session) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  }
  return json(
    {},
    {
      headers,
    }
  );
};

export default function Auth() {
  const location = useLocation();

  const isSigninPage = useMemo(() => {
    return location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;
  }, [location]);

  return (
    <div
      className={classNames({
        "signup-page": !isSigninPage,
      })}
    >
      <header
        className={classNames({
          "auth-header__signin": isSigninPage,
          "auth-header__signup": !isSigninPage,
        })}
      >
        <Icons.Logo className="h-8" />
      </header>
      <Outlet />
    </div>
  );
}
