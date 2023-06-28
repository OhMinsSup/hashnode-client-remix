// remix
import { Outlet } from "@remix-run/react";
import { redirect } from "@remix-run/cloudflare";
import { AuthLayout } from "~/components/auth/future/AuthLayout";
import { AuthHeader } from "~/components/auth/future/AuthHeader";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// styles
import authStyles from "~/styles/routes/auth.css";

// types
import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/cloudflare";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: authStyles }];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.user.isAuthenticated(request);
  if (isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT);
  }
  return null;
};

export type AuthLayoutLoader = typeof loader;

export const meta: V2_MetaFunction<AuthLayoutLoader> = ({ location }) => {
  const Seo = {
    signin: "Sign in to Hashnode",
    signup: "Sign up to Hashnode",
    description:
      "Start your programming blog. Share your knowledge and build your own brand",
  };
  const isSigninPage = location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;
  const title = isSigninPage ? Seo.signin : Seo.signup;
  return [
    {
      title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
  ];
};

export default function Routes() {
  return (
    <AuthLayout header={<AuthHeader />}>
      <Outlet />
    </AuthLayout>
  );
}
