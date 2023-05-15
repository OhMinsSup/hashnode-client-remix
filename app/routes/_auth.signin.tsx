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
import { signinSchema } from "~/api/auth/validation/signin";

// api
import { signinApi } from "~/api/auth/signin.server";

// types
import type { ActionArgs } from "@remix-run/cloudflare";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const form = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const parse = await signinSchema.parseAsync(form);
    console.log(parse);
    const { header: headers } = await signinApi(parse);
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
