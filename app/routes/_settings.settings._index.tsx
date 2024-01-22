import { SettingUserForm } from "~/components/setting/future/SettingUserForm";
import { SettingUserArea } from "~/components/setting/future/SettingUserArea";
import SettingUserFormProvider from "~/components/setting/context/form";

// hooks
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Change settings — Hashnode",
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

export const action = async ({ context, request }: ActionFunctionArgs) => {
  return await context.api.user.putUser(request);
};

export type RoutesActionData = typeof action;

export default function Routes() {
  return (
    <SettingUserFormProvider>
      <SettingUserForm>
        <SettingUserArea />
      </SettingUserForm>
    </SettingUserFormProvider>
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
