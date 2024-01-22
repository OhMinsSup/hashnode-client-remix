// hooks
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Email } from "~/components/setting/future/Email";

// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Account Settings — Hashnode",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta: any) =>
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

export const loader = ({ context }: LoaderFunctionArgs) => {
  return json({
    items: context.services.server.getSettingEmailItems(),
  });
};

export type RoutesLoader = typeof loader;

export default function Routes() {
  return <Email />;
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
