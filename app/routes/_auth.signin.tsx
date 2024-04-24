import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { signinAction } from "~/.server/routes/auth/signin.action";
import { signInMeta } from "~/services/seo/auth/signin.meta";

export const action = signinAction;

export const meta = signInMeta;

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
