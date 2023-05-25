import { useEffect } from "react";

import { redirect, json } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// hooks
import {
  isRouteErrorResponse,
  useLoaderData,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { isString } from "~/utils/assertion";

import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import type { FormFieldValues } from "./draft";

export const loader = async ({ context, params, request }: LoaderArgs) => {
  const id = params.itemId;
  if (!id) {
    throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  }
  const { json: data } = await context.api.item.getItem(id, request);
  return json({
    item: data.result,
  });
};

export const action = async ({ context, request, params }: ActionArgs) => {
  const id = params.itemId;
  if (!id) {
    throw new Response("Not Found", { status: STATUS_CODE.NOT_FOUND });
  }
  return actionErrorWrapper(async () => {
    const { json: data } = await context.api.item.updateItem(id, request);
    if (data.resultCode !== RESULT_CODE.OK) {
      throw redirect(PAGE_ENDPOINTS.DRAFT.ID(id), {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    return json({ ok: true, respData: data });
  });
};

export type ItemLoaderData = typeof loader;

export default function DraftPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const { item } = useLoaderData<ItemLoaderData>();
  const methods = useFormContext<FormFieldValues>();
  const ctx = useDraftContext();

  useEffect(() => {
    function startFetching() {
      if (!item) return;
      const publishingDate = item.publishingDate
        ? new Date(item.publishingDate)
        : new Date();
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
        disabledComment:
          typeof item.disabledComment === "boolean"
            ? item.disabledComment
            : false,
        publishingDate,
        seo: {
          title: item.seo?.title ?? "",
          desc: item.seo?.desc ?? "",
          image: item.seo?.image ?? "",
        },
      });
      if (item.content && isString(item.content)) {
        const data = JSON.parse(item.content);
        if (!data) return;
        ctx.$editorJS?.render?.(data);
      }
      if (item.subTitle) {
        ctx.toggleSubTitle(true);
      }
    }

    startFetching();
  }, [item, ctx.$editorJS, itemId]);

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
