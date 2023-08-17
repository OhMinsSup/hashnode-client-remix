import React from "react";

// components
import { Form, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { SigninForm } from "~/components/auth/future/SigninForm";
import { Input } from "~/components/auth/future/Input";
import { SubmitButton } from "~/components/auth/future/Button";

// remix
import { json } from "@remix-run/cloudflare";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const response = await context.api.auth.signinWithAuth(request);
  if (response instanceof Response) return response;
  return json(response);
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
