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
    <Form method="POST" className="auth-form__container" replace>
      <h1 className="auth-form__title">
        Sign up for blog and start sharing your knowledge
      </h1>
      <div className="social-container signup">
        <button
          type="button"
          aria-label="github login"
          className="btn-social-signup__base btn-social-signup__github"
        >
          <span>
            <Icons.Github className="icon__base fill-current" />
          </span>
          Continue with Github
        </button>
        <button
          type="button"
          aria-label="google login"
          className="btn-social-signup__base btn-social-signup__google"
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
          id="username"
          text="What's your username?"
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
          text="What's your email?"
          aria-label="Email address"
          autoComplete="email"
          placeholder="Enter your email."
        />
        <Input
          text="Create a password"
          type="password"
          name="password"
          id="password"
          autoComplete="new-password"
          aria-label="Password"
          placeholder="Create a password."
        />
        <Input
          text="Confirm your password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          autoComplete="new-password"
          aria-label="confirmPassword"
          placeholder="Confirm your password."
        />
      </div>
      <div className="btn-login__container">
        <button type="submit" className="btn-login" aria-label="Sign in">
          Sign up
        </button>
      </div>

      <div className="btn-signin__container">
        Have an account? <Link to={PAGE_ENDPOINTS.AUTH.SIGNIN}>Sign in</Link>.
      </div>
    </Form>
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
