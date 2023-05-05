import React, { useEffect } from "react";

import Json from "superjson";
import { redirect, json } from "@remix-run/cloudflare";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// hooks
import { useLoaderData } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { isString } from "~/utils/assertion";

// api
import { updatePostApi } from "~/api/posts/update.server";
import { getPostApi } from "~/api/posts/post.server";
import { updatePostSchema } from "~/api/posts/validation/update";

import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import type { FormFieldValues } from "./draft";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

export const loader = async (args: LoaderArgs) => {
  const id = args.params.itemId;

  if (!id) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // 인티저 영어
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const { json: data } = await getPostApi(itemId, {
    loaderArgs: args,
  });
  if (data.resultCode !== RESULT_CODE.OK) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  return json({
    item: data.result,
  });
};

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();

  const _input_body = formData.get("body")?.toString();

  try {
    if (!_input_body) {
      throw new Response("Missing body", { status: 400 });
    }
    const _input_json_body = Json.parse<FormFieldValues>(_input_body);
    const body = await updatePostSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: STATUS_CODE.BAD_REQUEST });
    }
    await updatePostApi(body.data, {
      actionArgs: args,
    });
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

export type ItemLoaderData = typeof loader;

export default function DraftPage() {
  const { item } = useLoaderData<ItemLoaderData>();
  const methods = useFormContext<FormFieldValues>();
  const ctx = useDraftContext();

  useEffect(() => {
    if (item) {
      methods.reset({
        title: item.title,
        subTitle: item.subTitle || undefined,
        content: item.content,
        thumbnail: item.thumbnail
          ? {
              url: item.thumbnail,
            }
          : undefined,
        tags: item.tags ? item.tags.map((tag) => tag.name) : undefined,
        disabledComment: false,
        publishingDate: undefined,
        seo: {
          title: "",
          desc: "",
          image: "",
        },
      });
      if (item.content && isString(item.content)) {
        const data = JSON.parse(item.content);
        if (!data) return;
        ctx.$editorJS?.render(data);
      }
      if (item.subTitle) {
        ctx.toggleSubTitle(true);
      }
    }
  }, [item]);

  return (
    <DraftShardActionFn>
      <DraftEditor />
    </DraftShardActionFn>
  );
}

export function CatchBoundary() {
  return <DraftPage />;
}
