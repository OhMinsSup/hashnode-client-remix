import React from "react";

// components
import {
  Form,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import Input from "~/components/auth/Input";

// constants
import { PAGE_ENDPOINTS, STATUS_CODE } from "~/constants/constant";

// remix
import { redirect } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  return actionErrorWrapper(async () => {
    const { response } = await context.api.auth.signin(request);
    const cookie = response.headers.get("set-cookie");
    if (!cookie) {
      return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getAuthHeaders(cookie),
    });
  });
};

export type SigninAction = typeof action;

export default function Signin() {
  return (
    <Form method="POST" className="auth-form__container" replace>
      <h1 className="auth-form__title">To continue, Sign in to hashnode.</h1>
      <div className="social-container">
        <button
          type="button"
          aria-label="github login"
          className="btn-social__base btn-social__github"
        >
          <span>
            <Icons.Github className="icon__base fill-current" />
          </span>
          Continue with Github
        </button>
        <button
          type="button"
          aria-label="google login"
          className="btn-social__base btn-social__google"
        >
          <span>
            <Icons.Google className="icon__base fill-current" />
          </span>
          Continue with Google
        </button>
        <div className="or-container">
          <p className="or-container__line"></p>
          <span className="or-container__text">OR</span>
        </div>
      </div>

      <div className="auth-form__form-item">
        <Input
          text="Email address"
          type="email"
          name="email"
          id="email"
          aria-label="Email address"
          autoComplete="email"
          placeholder="Email address."
        />
        <Input
          text="Password"
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          aria-label="Password"
          placeholder="Password."
        />
        <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN} className="forget-password">
          Forgot your password?
        </Link>
      </div>

      <div className="btn-login__container">
        <button type="submit" className="btn-login" aria-label="Sign in">
          Sign in
        </button>
      </div>

      <div className="btn-signup__container">
        <p className="or-container__line"></p>

        <h1 className="mt-6 text-xl font-bold">Don&apos;t have an account?</h1>

        <Link
          aria-label="Sign up"
          to={PAGE_ENDPOINTS.AUTH.SIGNUP}
          className="btn-signup"
        >
          Signup for hashnode
        </Link>
      </div>
    </Form>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Signin />;
  } else if (error instanceof Error) {
    return <Signin />;
  }
  return <Signin />;
}
