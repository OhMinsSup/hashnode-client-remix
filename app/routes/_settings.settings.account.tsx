import { Account } from "~/components/setting/future/Account";
import {
  ClientActionFunctionArgs,
  isRouteErrorResponse,
  json,
  useRouteError,
} from "@remix-run/react";
import { settingsAccountMeta } from "~/.server/routes/settings-account/settings-account-meta";
import { settingsAccountAction } from "~/.server/routes/settings-account/settings-account-action";

export const meta = settingsAccountMeta;

export const action = settingsAccountAction;

export const clientAction = async ({
  serverAction,
}: ClientActionFunctionArgs) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete your account?"
  );

  if (!confirmDelete) {
    return json(
      { status: "success" as const, message: "Account deletion cancelled" },
      { status: 200 }
    );
  }
  const data = await serverAction();
  return data;
};

export default function Routes() {
  return <Account />;
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
