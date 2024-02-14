// components
import {
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";

// types
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? undefined;
  return {
    email,
  };
};

export type RoutesLoaderData = ReturnType<typeof loader>;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  // return await context.api.auth.signupWithRedirect(request);
};

export type RoutesActionData = ReturnType<typeof action>;

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
