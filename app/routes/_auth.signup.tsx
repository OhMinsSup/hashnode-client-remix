import React from "react";

// components
import { Form, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { Input } from "~/components/auth/future/Input";
import { SubmitButton } from "~/components/auth/future/Button";

// constants
import { PAGE_ENDPOINTS, STATUS_CODE } from "~/constants/constant";

// remix
import { redirect } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const actionFn = async () => {
    const { response } = await context.api.auth.signup(request);
    const cookie = response.headers.get("set-cookie");
    if (!cookie) {
      return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getAuthHeaders(cookie),
    });
  };
  return actionErrorWrapper(actionFn);
};

export default function Routes() {
  return (
    <SigninForm>
      <Form method="POST" replace className="flex flex-col">
        <Input
          id="username"
          type="text"
          name="username"
          autoComplete="username"
          aria-label="Username"
          placeholder="Enter your username."
        />
        <Input
          id="email"
          type="email"
          name="email"
          aria-label="Email address"
          autoComplete="email"
          placeholder="Enter your email address"
        />
        <Input
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          aria-label="Password"
          placeholder="Enter your password"
        />
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          aria-label="confirmPassword"
          placeholder="Confirm your password."
        />
        <SubmitButton />
      </Form>
    </SigninForm>
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
