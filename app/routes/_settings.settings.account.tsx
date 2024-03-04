import { useCallback } from "react";
import { Account } from "~/components/setting/future/Account";

// hooks
import {
  isRouteErrorResponse,
  useFetcher,
  useRouteError,
} from "@remix-run/react";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { settingsAccountMeta } from "~/server/routes/settings-account/settings-account-meta";

export const meta = settingsAccountMeta;

export const action = async ({ context, request }: ActionFunctionArgs) => {
  console.log("request", request, context);
  // return await context.api.user.deleteUser(request);
  return {};
};

export type RoutesActionData = typeof action;

export default function Routes() {
  const fetcher = useFetcher<RoutesActionData>();

  const onDeleteAccount = useCallback(() => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    fetcher.submit(null, {
      method: "DELETE",
    });
  }, [fetcher]);

  return <Account onDeleteAccount={onDeleteAccount} />;
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
