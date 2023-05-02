import React from "react";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

import Json from "superjson";
import { redirect, json } from "@remix-run/cloudflare";

// constants
import { PAGE_ENDPOINTS, STATUS_CODE } from "~/constants/constant";

// api
import { createPostSchema } from "~/api/posts/validation/create";
import { postPostsApi } from "~/api/posts/posts";

// types
import type { ActionFunction } from "@remix-run/cloudflare";
import type { FormFieldValues } from "./draft";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

export const action: ActionFunction = async (ctx) => {
  const formData = await ctx.request.formData();

  const _input_body = formData.get("body")?.toString();
  if (!_input_body) {
    return;
  }
  const _input_json_body = Json.parse<FormFieldValues>(_input_body);

  try {
    const body = await createPostSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: STATUS_CODE.BAD_REQUEST });
    }
    await postPostsApi(body.data, ctx);
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
    throw json(error);
  }
};

export default function DraftPage() {
  return (
    <DraftShardActionFn>
      <DraftEditor />
    </DraftShardActionFn>
  );
}

export function CatchBoundary() {
  return <DraftPage />;
}
