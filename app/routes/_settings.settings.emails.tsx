import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Email } from "~/components/setting/future/Email";
import { settingsEmailLayoutLoader } from "~/.server/routes/settings-email/settings-email-loader";
import { settingsEmailMeta } from "~/.client/settings-email/settings-email-meta";

export const meta = settingsEmailMeta;

export const loader = settingsEmailLayoutLoader;

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
