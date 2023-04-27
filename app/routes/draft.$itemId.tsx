import React, { useEffect } from "react";

import Json from "superjson";
import { redirect, json } from "@remix-run/cloudflare";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { useLoaderData } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { isString } from "~/utils/assertion";

// api
import { getPostApi, postPostsApi } from "~/api/posts/posts";
import {
  createPostSchema,
  postHTTPErrorWrapper,
  postValidationErrorWrapper,
} from "~/api/posts/validation/create";

import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import type { FormFieldValues } from "./draft";

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

  const { result } = await getPostApi(itemId, args);
  return json({
    item: result.result,
  });
};

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();

  const _input_body = formData.get("body")?.toString();
  if (!_input_body) {
    return;
  }
  const _input_json_body = Json.parse<FormFieldValues>(_input_body);

  try {
    const body = await createPostSchema.safeParseAsync(_input_json_body);
    if (!body.success) {
      return json(body.error, { status: 400 });
    }
    await postPostsApi(body.data, args);
    return redirect(PAGE_ENDPOINTS.ROOT);
  } catch (error) {
    const error_validation = postValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation);
    }
    const error_http = await postHTTPErrorWrapper(error);
    if (error_http) {
      return json(error_http.errors);
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
