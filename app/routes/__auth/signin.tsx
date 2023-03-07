import { json, redirect } from "@remix-run/cloudflare";
import classNames from "classnames";

import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";

// components
import { LoadingIcon } from "~/components/ui/Icon";
import ValidationMessage from "~/components/ui/error/ValidationMessage";
import Button from "~/components/ui/shared/Button";

// api
import { signinApi } from "~/api/auth/auth";
import {
  signinValidationErrorWrapper,
  signinHTTPErrorWrapper,
  signinSchema,
} from "~/api/auth/validation/signin";

// hooks
import { useFormLoading } from "~/libs/hooks/useFormLoading";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { ActionFunction } from "@remix-run/cloudflare";
import type { ThrownResponse } from "@remix-run/react";
import type { HTTPError } from "ky-universal";

interface ActionData {
  errors?: Record<string, string> | null;
}

interface Props {
  error?: HTTPError;
}

export default function Signin({ error }: Props) {
  const transition = useTransition();
  const actionData = useActionData<ActionData>();

  const errors = actionData?.errors;

  const isLoading = useFormLoading();

  return (
    <Form method="post" className="form__auth" replace>
      <div>
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
        <label className="mt-4 font-semibold text-black">
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

  return <Signin error={caught.data} />;
}

export const action: ActionFunction = async ({ request }) => {
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
    const nextError = signinValidationErrorWrapper(error);
    if (nextError) {
      return json({
        errors: nextError,
      });
    }
    const httpError = signinHTTPErrorWrapper(error);
    if (httpError) {
      return json({
        errors: httpError,
      });
    }

    throw json(error);
  }
};
