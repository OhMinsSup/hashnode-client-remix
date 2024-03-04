import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { signupAction } from "~/server/routes/signup/signup-action.server";
import {
  signupLoader,
  type RoutesLoaderData,
} from "~/server/routes/signup/signup-loader.server";
import { signupMeta } from "~/server/routes/signup/signup-meta";

export const loader = signupLoader;

export const action = signupAction;

export const meta = signupMeta;

export default function Routes() {
  const { email } = useLoaderData<RoutesLoaderData>();
  return <SigninForm.Register email={email} />;
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
