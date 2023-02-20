import { json, redirect } from "@remix-run/cloudflare";
import classNames from "classnames";

import { Form, useActionData, useCatch, useTransition } from "@remix-run/react";

// components
import { ValidationMessage } from "~/components/ui/error";
import { LoadingIcon } from "~/components/ui/Icon";

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
    <Form method="post" className="mb-4 mt-9 flex flex-col" replace>
      <div>
        <label className="font-semibold text-black">
          Email
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email address"
            className="mb-2 mt-2 w-full rounded-md border bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
          />
        </label>
        {errors?.["email"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["email"]}
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
            className="mb-2 mt-2 w-full rounded-md border  bg-white p-3 outline outline-2 outline-offset-2 outline-transparent focus:border-blue-600 md:p-4 md:text-base"
          />
        </label>
        {errors?.["password"] ? (
          <ValidationMessage
            isSubmitting={transition.state === "submitting"}
            error={errors?.["password"]}
          />
        ) : null}
      </div>
      <button
        className={classNames(
          "mt-6 inline-flex w-full flex-row items-center justify-center self-center rounded-full border border-blue-600 bg-blue-600 py-2 px-20 text-center text-sm font-semibold text-white outline outline-2 outline-offset-2 outline-transparent md:py-2.5 md:text-base",
          {
            "cursor-not-allowed": isLoading,
          }
        )}
        type="submit"
        disabled={isLoading}
      >
        {isLoading && <LoadingIcon />}
        {isLoading ? "loading..." : "submit"}
      </button>
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
