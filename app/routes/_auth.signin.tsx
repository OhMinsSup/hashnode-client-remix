// components
import { SigninProvider } from "~/components/auth/context/signin";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { json } from "@remix-run/cloudflare";

// types
import type { ResponseState } from "services/app/server.server";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const isRegister = searchParams.get("type") === "register";
  if (isRegister) {
    const response = await context.api.auth.signupWithAuth(request);
    if (response instanceof Response) return response;
    return json(response);
  }
  const response = await context.api.auth.signinWithAuth(request);
  if (response instanceof Response) return response;
  return json(response);
};

export type ActionData = ResponseState<boolean | null> | null;

export default function Routes() {
  return (
    <SigninProvider>
      <SigninForm />
    </SigninProvider>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  }
  return <Routes />;
}
