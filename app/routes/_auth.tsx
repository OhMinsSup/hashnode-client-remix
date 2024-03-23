// remix
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AuthLayout } from "~/components/auth/future/AuthLayout";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { redirectIfLoggedInLoader } from "~/.server/auth.server";
import { mergeMeta } from "~/utils/util";

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  redirectIfLoggedInLoader(request, context, PAGE_ENDPOINTS.ROOT);
  const data = {
    image: ASSET_URL.DEFAULT_AVATAR,
    username: "Guillermo Rauch",
    job: "CEO, Vercel",
    description: `It's amazing to see how fast devs go from 0 to Blog under a domain they own on Hashnode 🤯. It reminds me a lot of what Substack did for journalists.`,
  } as FetchSchema.Hashnodeonboard;
  return json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
};

export type RoutesLoader = Promise<FetchSchema.Hashnodeonboard>;

export const meta: MetaFunction<RoutesLoader> = mergeMeta(() => {
  const content =
    "Start your programming blog. Share your knowledge and build your own brand";
  return [
    {
      name: "description",
      content,
    },
    {
      name: "og:description",
      content,
    },
    {
      name: "twitter:description",
      content,
    },
  ];
});

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
