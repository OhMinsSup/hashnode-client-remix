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
import type { LinksFunction, V2_MetaFunction } from "@remix-run/cloudflare";

const Seo = {
  signin: "Sign in to Hashnode",
  signup: "Sign up to Hashnode",
  description:
    "Start your programming blog. Share your knowledge and build your own brand",
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export const meta: V2_MetaFunction = ({ location }) => {
  const isSigninPage = location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;
  const title = isSigninPage ? Seo.signin : Seo.signup;
  return [
    {
      title,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  if (session) {
    throw redirect(PAGE_ENDPOINTS.ROOT, {
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
