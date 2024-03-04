import { SettingUserArea } from "~/components/setting/future/SettingUserArea";
import SettingUserFormProvider from "~/components/setting/context/form";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { settingsMeta } from "~/server/routes/settings/settings-meta";

export const meta = settingsMeta;

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log(formData);
  // return await context.api.user.putUser(request);
  return {};
};

export type RoutesActionData = typeof action;

export default function Routes() {
  return (
    <SettingUserFormProvider>
      <SettingUserArea />
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
