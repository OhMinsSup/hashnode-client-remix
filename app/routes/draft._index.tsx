import React from "react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

import Json from "superjson";
import { redirect, json } from "@remix-run/cloudflare";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// api
import { createPostSchema } from "~/api/posts/validation/create";
import { createPostApi } from "~/api/posts/create.server";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

// types
import type { ActionArgs } from "@remix-run/cloudflare";
import type { FormFieldValues } from "./draft";

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();
  const _input_body = formData.get("body")?.toString();

  try {
    if (!_input_body) {
      throw new Response("Missing body", { status: 400 });
    }
    const _input_json_body = Json.parse<FormFieldValues>(_input_body);
    const body = await createPostSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: STATUS_CODE.BAD_REQUEST });
    }
    const { json: data } = await createPostApi(body.data, {
      actionArgs: args,
    });
    if (data.resultCode !== RESULT_CODE.OK) {
      return json({ ok: false, respData: data });
    }
    return redirect(PAGE_ENDPOINTS.ROOT);
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

export default function DraftPage() {
  return (
    <DraftShardActionFn>
      <DraftEditor />
    </DraftShardActionFn>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
