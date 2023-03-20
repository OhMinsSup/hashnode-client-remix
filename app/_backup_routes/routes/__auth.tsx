import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";

import AuthTemplate from "~/components/__auth/AuthTemplate";
import AuthInfoBox from "~/components/__auth/AuthInfoBox";

import { useMemo } from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

import { getSessionApi } from "~/api/user/user";

// styles
import authStylesheetUrl from "~/styles/auth.css";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader = async (args: LoaderArgs) => {
  const content = `Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, 
  slick, and resilient user experience. People are gonna love using your stuff.`;
  const data = {
    content,
  };
  const { session, header: headers } = await getSessionApi(args);
  if (session) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  }
  return json(data, {
    headers,
  });
};

export default function Auth() {
  const { content } = useLoaderData();
  const location = useLocation();

  const isSigninPage = useMemo(() => {
    return location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;
  }, [location]);

  return (
    <AuthTemplate
      isSigninPage={isSigninPage}
      infoBox={<AuthInfoBox content={content} />}
    >
      <Outlet />
    </AuthTemplate>
  );
}
