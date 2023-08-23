// remix
import { redirect } from "@remix-run/cloudflare";

// components
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/cloudflare";
import { WriteLayout } from "~/components/write/future/WriteLayout";
import { WriteLeftSide } from "~/components/write/future/WriteLeftSide";

export const meta: V2_MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Editing Article",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title: Seo.title,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
  ];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.auth.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.services.server.getClearAuthHeaders(),
    });
  }
  return null;
};

export default function Routes() {
  return (
    <WriteLayout sidebar={<WriteLeftSide />}>
      <Outlet />
    </WriteLayout>
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
