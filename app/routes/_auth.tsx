// remix
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AuthLayout } from "~/components/auth/future/AuthLayout";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import "~/styles/routes/auth.css";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { redirectIfLoggedInLoader } from "~/server/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  redirectIfLoggedInLoader(request, PAGE_ENDPOINTS.ROOT);
  const data = {
    image: ASSET_URL.DEFAULT_AVATAR,
    username: "Guillermo Rauch",
    job: "CEO, Vercel",
    description: `It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.`,
  } as FetchSchema.Hashnodeonboard;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
};

export type RoutesLoader = Promise<FetchSchema.Hashnodeonboard>;

export const meta: MetaFunction<RoutesLoader> = ({ location }) => {
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
    <AuthLayout>
      <Outlet />
    </AuthLayout>
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
