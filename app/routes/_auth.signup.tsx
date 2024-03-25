import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { signupAction } from "~/.server/routes/signup/signup.action";
import {
  signupLoader,
  type RoutesLoaderData,
} from "~/.server/routes/signup/signup.loader";
import { SignupForm } from "~/components/auth/future/SignupForm";
import { signupMeta } from "~/services/seo/signup/signup.meta";

export const loader = signupLoader;

export const action = signupAction;

export const meta = signupMeta;

export default function Routes() {
  const { email } = useLoaderData<RoutesLoaderData>();
  return <SignupForm email={email} />;
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
