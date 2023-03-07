import { json, redirect } from "@remix-run/cloudflare";
import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";

// components
import { LoadingIcon } from "~/components/ui/Icon";
import ValidationMessage from "~/components/ui/error/ValidationMessage";
import Button from "~/components/ui/shared/Button";

// hooks
import { useFormLoading } from "~/libs/hooks/useFormLoading";

// api
import { signupApi } from "~/api/auth";

// utils
import classNames from "classnames";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { HTTPError } from "ky-universal";
import type { ActionFunction } from "@remix-run/cloudflare";
import type { ThrownResponse } from "@remix-run/react";
import {
  signupHTTPErrorWrapper,
  signupSchema,
  signupValidationErrorWrapper,
} from "~/api/auth/validation/signup";

interface ActionData {
  errors?: Record<string, string> | null;
}

interface Props {
  error?: HTTPError;
}

export default function Signup({ error }: Props) {
  const transition = useTransition();
  const actionData = useActionData<ActionData>();

  const errors = actionData?.errors;

  const isLoading = useFormLoading();

  return (
    <Form method="post" className="form__auth" replace>
      <div>
        <label className="font-semibold text-black">
          Username
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            placeholder="Enter your username"
            className="form__input mb-4"
            defaultValue="veloss"
          />
        </label>

        {errors?.["username"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["username"]}
          />
        ) : null}
        <label className="font-semibold text-black">
          Email
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className="form__input mb-4"
            defaultValue="mins5190@naver.com"
          />
        </label>
        {errors?.["email"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["email"]}
          />
        ) : null}
        <label className="font-semibold text-black">
          name
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className="form__input mb-4"
            defaultValue="tester"
          />
        </label>
        {errors?.["name"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["name"]}
          />
        ) : null}
        <label className="font-semibold text-black">
          Password
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Enter your password"
            className="form__input mb-4"
            defaultValue="1q2w3e4r!@"
          />
        </label>
        {errors?.["password"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["password"]}
          />
        ) : null}
        <label className="font-semibold text-black">
          Confirm Password
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            autoComplete="password"
            placeholder="Enter your password"
            className="form__input mb-4"
            defaultValue="1q2w3e4r!@"
          />
        </label>
        {errors?.["confirmPassword"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["confirmPassword"]}
          />
        ) : null}
      </div>
      <Button
        type="submit"
        className={classNames("form__submit-btn", {
          "cursor-not-allowed": isLoading,
        })}
        isDisabled={isLoading}
      >
        {isLoading && <LoadingIcon />}
        {isLoading ? "loading..." : "submit"}
      </Button>
    </Form>
  );
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, any>>();

  return <Signup error={caught.data} />;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    confirmPassword: formData.get("confirmPassword"),
  };

  try {
    const parse = await signupSchema.parseAsync(form);

    const { header: headers } = await signupApi({
      username: parse.username,
      email: parse.email,
      password: parse.password,
    });

    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  } catch (error) {
    const nextError = signupValidationErrorWrapper(error);
    if (nextError) {
      return json({
        errors: nextError,
      });
    }

    const httpError = signupHTTPErrorWrapper(error);
    if (httpError) {
      return json({
        errors: httpError,
      });
    }

    throw json(error);
  }
};
