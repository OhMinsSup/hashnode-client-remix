import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { signinAction } from "~/.server/routes/signin/signin-action.server";
import { signinmeta } from "~/.server/routes/signin/signin-meta";

export const action = signinAction;

export const meta = signinmeta;

export default function Routes() {
  return <SigninForm />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  }
  return <Routes />;
}
