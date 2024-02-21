import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import type { MetaFunction } from "@remix-run/cloudflare";
import { mergeMeta } from "~/utils/util";
import { signupAction } from "~/server/routes/signup/siginup-action.server";
import {
  signupLoader,
  type RoutesLoaderData,
} from "~/server/routes/signup/signup-loader.server";

export const loader = signupLoader;

export const action = signupAction;

export const meta: MetaFunction = mergeMeta(() => [
  {
    signup: "Sign up to Hashnode",
  },
  {
    name: "twitter:title",
    signup: "Sign up to Hashnode",
  },
  {
    name: "og:title",
    signup: "Sign up to Hashnode",
  },
]);

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
