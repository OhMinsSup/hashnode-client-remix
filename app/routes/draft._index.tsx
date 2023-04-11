import React, { useEffect, useCallback, useRef } from "react";
import DraftEditor from "~/components/draft/DraftEditor";
import isEqual from "lodash-es/isEqual";
import Json from "superjson";
import { redirect, json } from "@remix-run/cloudflare";
import { postPostsApi } from "~/api/posts/posts";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useFormContext } from "react-hook-form";

import { hashnodeDB } from "~/libs/db/db";
import {
  createPostSchema,
  postHTTPErrorWrapper,
  postValidationErrorWrapper,
} from "~/api/posts/validation/create";

// types
import { Transition, useDraftContext } from "~/context/useDraftContext";
import type { ActionFunction } from "@remix-run/cloudflare";

import type { FormFieldValues } from "./draft";

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
      return json(body.error, { status: 400 });
    }
    const { result } = await postPostsApi(body.data, ctx);
    return redirect(PAGE_ENDPOINTS.ROOT);
  } catch (error) {
    const error_validation = postValidationErrorWrapper(error);
    if (error_validation) {
      return json(error_validation);
    }
    const error_http = await postHTTPErrorWrapper(error);
    console.log(error_http);
    if (error_http) {
      return json(error_http.errors);
    }
    throw json(error);
  }
};

export default function DraftPage() {
  const { watch } = useFormContext<FormFieldValues>();

  const { transition, draftId, changeDraftId, changeTransition } =
    useDraftContext();
  const { getSnapShot, setSnapShot } = useSnapShot<FormFieldValues>();

  const watchAll = watch();

  const debounced = useDebounceFn(
    async (input: FormFieldValues) => {
      const snapShot = getSnapShot();

      const body = {
        ...input,
      };

      if (isEqual(snapShot, body)) {
        return;
      }

      setSnapShot(body);

      if (draftId) {
        try {
          await hashnodeDB.updateDraft(draftId, body);
        } catch (error) {
          console.error(error);
        } finally {
          changeTransition(Transition.IDLE);
        }
        return;
      }

      try {
        const indexableType = await hashnodeDB.addDraft(body);
        const idx = parseInt(indexableType.toString(), 10);
        if (indexableType && !Number.isNaN(idx)) {
          changeDraftId(idx);
        }
      } catch (error) {
        console.error(error);
      } finally {
        changeTransition(Transition.IDLE);
      }
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  useEffect(() => {
    if (transition === Transition.UPDATING) {
      debounced.run(watchAll);
    }
  }, [transition, watchAll]);

  return <DraftEditor />;
}

export function CatchBoundary() {
  return <DraftPage />;
}

const useSnapShot = <T extends Record<string, any>>() => {
  const ref = useRef<T>();

  const setSnapShot = useCallback((value: T) => {
    ref.current = value;
  }, []);

  const getSnapShot = useCallback(() => {
    return ref.current;
  }, []);

  return {
    setSnapShot,
    getSnapShot,
  };
};
