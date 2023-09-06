import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// types
import type { V2_MetaFunction } from "@remix-run/cloudflare";

import { CategoryBoxWithHashnodeList } from "~/components/shared/future/CategoryBoxWithHashnodeList";
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";

export const meta: V2_MetaFunction = ({ data, matches }) => {
  const Seo = {
    title: "My Items - Hashnode",
    description: "My Items - Hashnode",
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
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
  ];
};

export default function Routes() {
  return (
    <MainLayout footer={<MainFooter />} sidebar={<HashnodeAside />}>
      <CategoryBoxWithHashnodeList
        title="My Items"
        description="Manage your items"
      >
        <Outlet />
      </CategoryBoxWithHashnodeList>
    </MainLayout>
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
