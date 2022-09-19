import { json, redirect } from "@remix-run/cloudflare";
import classNames from "classnames";

import {
  Form,
  useActionData,
  useCatch,
  useNavigate,
  useTransition,
} from "@remix-run/react";

// error
import { HTTPError } from "ky-universal";

// components
import { match, P } from "ts-pattern";
import { ValidationMessage } from "~/components/ui/Error";
import { LoadingIcon } from "~/components/ui/Icon";

// api
import { signinApi } from "~/api/auth/auth";

// hooks
import { useFormLoading } from "~/libs/hooks/useFormLoading";

// constants
import { PAGE_ENDPOINTS, STATUS_CODE } from "~/constants/constant";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

// types
import type { ActionFunction } from "@remix-run/cloudflare";
import type { ThrownResponse } from "@remix-run/react";
import type { ErrorAPI } from "~/api/schema/api";

interface ActionData {
  errors?: Record<string, string> | null;
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const validForm = await schema.signin().validate(form, {
      abortEarly: false,
    });

    const { header: headers } = await signinApi({
      email: validForm.email,
      password: validForm.password,
    });

    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers,
    });
  } catch (error) {
    if (ValidationError.isError(error)) {
      const errors = error.inner.reduce((acc, { path, message }) => {
        if (!path) return acc;
        acc[path] = message;
        return acc;
      }, {} as Record<string, string>);
      return json({
        errors,
      });
    }

    if (error instanceof HTTPError) {
      const resp = error.response;
      const data = await resp.json<ErrorAPI>();

      if (
        [STATUS_CODE.BAD_REQUEST, STATUS_CODE.NOT_FOUND].includes(resp.status)
      ) {
        const errorKey = data.error;
        const state = match(data.message)
          .with(P.array(P.string), (data) => ({
            errors: {
              [errorKey]: data[0],
            },
          }))
          .with(P.string, (data) => ({
            errors: {
              [errorKey]: data,
            },
          }))
          .exhaustive();

        return json(state);
      }

      throw json(error, {
        status: error.response.status,
      });
    }
  }
};

interface Props {
  error?: HTTPError;
}

export default function Signin({ error }: Props) {
  const transition = useTransition();
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  const errors = actionData?.errors;

  const isLoading = useFormLoading();

  return (
    <div className="col-[1/-1] flex flex-col lg:col-span-6">
      <h1 className="flex flex-col text-center font-sans text-4xl font-extrabold text-gray-900">
        <span className="bg-gradient-to-tr from-[#3466F6] to-[#7c3aed] box-decoration-clone bg-clip-text text-transparent">
          Log in
        </span>
      </h1>
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

      <hr className="mt-2 border-t" />

      <button
        type="button"
        onClick={() => navigate(PAGE_ENDPOINTS.AUTH.SIGNUP)}
        className="mt-6 inline-flex flex-row items-center justify-center self-center rounded-full px-3 py-1 text-center text-base font-semibold text-white outline outline-2 outline-offset-2 outline-transparent"
      >
        <span className="text-blue-600">Continue with Signup -&gt;</span>
      </button>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch<ThrownResponse<number, any>>();

  return <Signin error={caught.data} />;
}
