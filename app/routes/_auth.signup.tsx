import React, { useMemo } from "react";
import classNames from "classnames";

// components
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import ErrorMessage from "~/components/shared/ErrorMessage";
import { Icons } from "~/components/shared/Icons";

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
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
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
    throw json(error);
  }
};

export default function Signup() {
  const errors = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <Form method="post" className="auth-form__container" replace>
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
        <div className="auth-form__form-item-inner mb-3">
          <label className="text-sm" htmlFor="username">
            What's your username?
          </label>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="username"
            aria-label="Username"
            placeholder="Enter your username."
            className={classNames("auth-form__input", {
              error: !!errors?.username,
            })}
          />
          <ErrorMessage error={errors?.username} isSubmitting={isSubmitting} />
        </div>

        <div className="auth-form__form-item-inner mb-3">
          <label className="text-sm" htmlFor="email">
            What's your email?
          </label>
          <input
            type="email"
            name="email"
            id="email"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Enter your email."
            className={classNames("auth-form__input", {
              error: !!errors?.email,
            })}
          />
          <ErrorMessage error={errors?.email} isSubmitting={isSubmitting} />
        </div>

        <div className="auth-form__form-item-inner mb-3">
          <label className="text-sm" htmlFor="password">
            Create a password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            aria-label="Password"
            placeholder="Create a password."
            className={classNames("auth-form__input", {
              error: !!errors?.password,
            })}
          />
          <ErrorMessage error={errors?.password} isSubmitting={isSubmitting} />
        </div>

        <div className="auth-form__form-item-inner mb-3">
          <label className="text-sm" htmlFor="passwordConfirm">
            Confirm your password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            autoComplete="new-password"
            aria-label="passwordConfirm"
            placeholder="Confirm your password."
            className={classNames("auth-form__input", {
              error: !!errors?.passwordConfirm,
            })}
          />
          <ErrorMessage
            error={errors?.passwordConfirm}
            isSubmitting={isSubmitting}
          />
        </div>
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
