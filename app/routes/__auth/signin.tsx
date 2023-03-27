import React, { useMemo } from "react";
import classNames from "classnames";

// components
import {
  Form,
  Link,
  useCatch,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import ErrorMessage from "~/components/shared/ErrorMessage";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// remix
import { json, redirect } from "@remix-run/cloudflare";

// validation
import {
  signinHTTPErrorWrapper,
  signinSchema,
  signinValidationErrorWrapper,
} from "~/api/auth/validation/signin";

// api
import { signinApi } from "~/api/auth/auth";

// types
import type { ThrownResponse } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  const form = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const parse = await signinSchema.parseAsync(form);
    const { header: headers } = await signinApi(parse);

    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  } catch (error) {
    const error_validation = signinValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation);
    }
    const error_http = await signinHTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors);
    }

    throw json(error);
  }
};

interface SigninProps {
  error?: Record<string, any>;
}

export default function Signin(props: SigninProps) {
  const errors = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <Form method="post" className="auth-form__container" replace>
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
        <div className="auth-form__form-item-inner mb-3">
          <label className="text-sm" htmlFor="email">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Email address."
            className={classNames("auth-form__input", {
              error: !!errors?.email,
            })}
          />
          <ErrorMessage error={errors?.email} isSubmitting={isSubmitting} />
        </div>

        <div className="auth-form__form-item-inner">
          <label className="text-sm" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            aria-label="Password"
            placeholder="Password."
            className={classNames("auth-form__input", {
              error: !!errors?.password,
            })}
          />
          <ErrorMessage error={errors?.password} isSubmitting={isSubmitting} />
        </div>

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

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, any>>();

  return <Signin error={caught.data} />;
}
