import { json } from "@remix-run/cloudflare";

import { SettingUserForm } from "~/components/setting/future/SettingUserForm";
import { SettingUserArea } from "~/components/setting/future/SettingUserArea";

// hooks
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import type { ActionArgs, V2_MetaFunction } from "@remix-run/cloudflare";

export const meta: V2_MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Change settings — Hashnode",
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

export const action = async ({ context, request }: ActionArgs) => {
  const response = await context.api.user.updateByUser(request);
  if (response instanceof Response) return response;
  return json(response);
};

export type Action = typeof action;

export default function Routes() {
  return (
    <SettingUserForm>
      <SettingUserArea />
    </SettingUserForm>
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
