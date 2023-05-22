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
import { PAGE_ENDPOINTS } from "~/constants/constant";

// remix
import { json, redirect } from "@remix-run/cloudflare";

// validation
import { signupSchema } from "~/api/auth/validation/signup";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

// api
import { signupApi } from "~/api/auth/signup.server";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const form = {
    username: formData.get("username") || "",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    confirmPassword: formData.get("confirmPassword") || "",
  };

  try {
    const parse = await signupSchema.parseAsync(form);
    const { header: headers } = await signupApi({
      email: parse.email,
      username: parse.username,
      password: parse.password,
    });
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  } catch (error) {
    const error_validation = ValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation.errors, {
        status: error_validation.statusCode,
      });
    }
    const error_http = await HTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors, {
        status: error_http.statusCode,
      });
    }
    throw error;
  }
};

export type SignupAction = typeof action;

export default function Signup() {
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
    return <Signup />;
  } else if (error instanceof Error) {
    return <Signup />;
  }
  return <Signup />;
}
