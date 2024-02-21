import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { mergeMeta } from "~/utils/util";
import { signinAction } from "~/server/routes/signin/siginin-action.server";
import type { MetaFunction } from "@remix-run/cloudflare";

export const action = signinAction;

export const meta: MetaFunction = mergeMeta(() => [
  {
    title: "Sign in to Hashnode",
  },
  {
    name: "twitter:title",
    content: "Sign in to Hashnode",
  },
  {
    name: "og:title",
    content: "Sign in to Hashnode",
  },
]);

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
