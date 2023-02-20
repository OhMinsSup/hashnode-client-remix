import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";

import AuthTemplate from "~/components/auth/AuthTemplate";
import AuthInfoBox from "~/components/auth/AuthInfoBox";

import authStylesheetUrl from "~/styles/auth.css";

// types
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { useMemo } from "react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = () => {
  const content = `Remix is a full stack web framework that lets you focus on the user interface and work back through web standards to deliver a fast, 
  slick, and resilient user experience. People are gonna love using your stuff.`;

  return json({
    content,
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
