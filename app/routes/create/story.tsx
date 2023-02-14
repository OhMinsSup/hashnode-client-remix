import React, { useCallback, useEffect, useRef } from "react";
import cookies from "cookie";
import { redirect } from "@remix-run/cloudflare";
import { applyAuth } from "~/libs/server/applyAuth";
import isEqual from "lodash-es/isEqual";

// components
import { Editor } from "~/components/ui/editor";
import { TypographyIcon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/shared";
import {
  CoverImage,
  CoverImagePopover,
  SubTitle,
  Title,
  PublishDrawer,
} from "~/components/write";

// hooks
import { useFetcher } from "@remix-run/react";
import { Transition, useWriteContext } from "~/stores/useWirteContext";
import { useFormContext } from "react-hook-form";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useSnapShot } from "~/libs/hooks/useSnapShot";

// validation
import { getTargetElement, scheduleMicrotask } from "~/libs/browser-utils";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";
import { isEmpty } from "~/utils/assertion";

// api
import { createPostsApi } from "~/api/posts/posts";
import { createDraftsApi, saveDraftsApi } from "~/api/drafts/drafts";

// types
import type { SubmitHandler } from "react-hook-form";
import type { ActionFunction } from "@remix-run/cloudflare";
import type { FormFieldValues } from "~/routes/create";

export const action: ActionFunction = async ({ request }) => {
  const token = applyAuth(request);
  if (!token) {
    throw new Error("Not logged in");
  }

  const formData = await request.formData();

  const data = {
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    description: formData.get("description"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: formData.get("tags"),
    disabledComment: formData.get("disabledComment"),
    isPublic: formData.get("isPublic"),
    hasPublishedTime: formData.get("hasPublishedTime"),
    publishingDate: formData.get("publishingDate"),
  } as Record<string, string>;

  const isNullOrUndefined = (value: string | null | undefined) => {
    return (
      value === null ||
      value === undefined ||
      value === "null" ||
      value === "undefined"
    );
  };

  const stringToBoolean = (value: string) => {
    return value === "true";
  };

  const toDate = (value: string) => {
    return new Date(value);
  };

  const thumbnail = isNullOrUndefined(data.thumbnail)
    ? null
    : JSON.parse(data.thumbnail)?.url;

  const beforTags = isNullOrUndefined(data.tags) ? null : data.tags.split(",");

  const tags = !beforTags || isEmpty(beforTags) ? [] : beforTags;

  try {
    const body = {
      title: (isNullOrUndefined(data.title) ? null : data.title) as string,
      subTitle: isNullOrUndefined(data.subTitle) ? null : data.subTitle,
      description: (isNullOrUndefined(data.description)
        ? null
        : data.description) as string,
      content: (isNullOrUndefined(data.content)
        ? null
        : data.content) as string,
      tags,
      thumbnail,
      disabledComment: isNullOrUndefined(data.disabledComment)
        ? false
        : stringToBoolean(data.disabledComment),
      isPublic: isNullOrUndefined(data.isPublic)
        ? false
        : stringToBoolean(data.isPublic),
      hasPublishedTime: isNullOrUndefined(data.hasPublishedTime)
        ? false
        : stringToBoolean(data.hasPublishedTime),
      publishingDate: isNullOrUndefined(data.publishingDate)
        ? null
        : toDate(data.publishingDate),
    };

    const { result } = await createPostsApi(body, {
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set(
              "Cookie",
              cookies.serialize("access_token", token)
            );
            return request;
          },
        ],
      },
    });

    return redirect(PAGE_ENDPOINTS.ITEMS.ID(result.result.dataId));
  } catch (error) {
    console.log(error);
  }
};

export default function CreateStory() {
  const { setValue, watch, handleSubmit } = useFormContext<FormFieldValues>();

  const { setEditorJS, editorJS, setTransition, transition } =
    useWriteContext();

  const watchThumbnail = watch("thumbnail");

  const watchAll = watch();

  const fetcher = useFetcher();

  const formRef = useRef<HTMLFormElement>(null);

  const { setSnapShot, getSnapShot } = useSnapShot();

  const { toggleSubtitle, visibility, draftId, setDraftsId } =
    useWriteContext();

  const debounced = useDebounceFn(
    async (input: FormFieldValues) => {
      const snapShot = getSnapShot();

      const body = {
        ...input,
        thumbnail: input.thumbnail ? input.thumbnail.url : undefined,
        ...(draftId && { draftId }),
      };

      if (isEqual(snapShot, body)) {
        return;
      }

      setSnapShot(body);

      if (!draftId) {
        try {
          const resp = await createDraftsApi(body);

          const { resultCode = -1, result } = resp.result;
          if (resultCode === RESULT_CODE.OK) {
            setDraftsId(result.dataId);
            setTransition(Transition.DONE);
          }
        } catch (error) {
          console.log(error);
        } finally {
          scheduleMicrotask(() => {
            setTransition(Transition.IDLE);
          });
        }
        return;
      }

      try {
        const resp = await saveDraftsApi(body);
        const { resultCode = -1, result } = resp.result;
        if (resultCode === RESULT_CODE.OK) {
          setDraftsId(result.dataId);
          setTransition(Transition.DONE);
        }
      } catch (error) {
        console.log(error);
      } finally {
        scheduleMicrotask(() => {
          setTransition(Transition.IDLE);
        });
      }
    },
    {
      wait: 500,
      trailing: true,
    }
  );

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    const body = {
      ...input,
      thumbnail: input.thumbnail ? JSON.stringify(input.thumbnail) : null,
    };
    // @ts-ignore
    fetcher.submit(body, {
      method: "post",
    });
  };

  const onRemoveThumbnail = useCallback(() => {
    setValue("thumbnail", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setTransition(Transition.UPDATING);
  }, [setTransition, setValue]);

  const syncEditorContent = useCallback(async () => {
    const blocks = await editorJS?.save();
    const data = JSON.stringify(blocks);

    setValue("content", data, {
      shouldDirty: true,
      shouldValidate: true,
    });

    return data;
  }, [editorJS, setValue]);

  const onPublich = useCallback(async () => {
    const ele = getTargetElement(formRef);
    ele?.dispatchEvent(
      new Event("submit", {
        cancelable: true,
        bubbles: true,
      })
    );
  }, []);

  useEffect(() => {
    console.log("Transition Status::", transition);
    if (transition === Transition.UPDATING) {
      debounced.run(watchAll);
    }
  }, [transition, watchAll]);

  return (
    <>
      <form
        method="post"
        ref={formRef}
        className="create-post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative mb-10 flex flex-row items-center">
          {!watchThumbnail && <CoverImagePopover />}
          <Button
            className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
            aria-label="add post sub title"
            aria-haspopup={visibility.subTitle ? "true" : "false"}
            onPress={() => toggleSubtitle(true)}
          >
            <TypographyIcon className="mr-2 h-5 w-5 fill-current" />
            <span>Add Subtitle</span>
          </Button>
        </div>
        {watchThumbnail && (
          <CoverImage src={watchThumbnail.url} onRemove={onRemoveThumbnail} />
        )}
        <Title />
        <SubTitle />
        <div className="relative z-20">
          <Editor
            onReady={setEditorJS}
            onChange={async () => {
              await syncEditorContent();
              setTransition(Transition.UPDATING);
            }}
          />
        </div>
      </form>
      <PublishDrawer onPublich={onPublich} />
    </>
  );
}

export function CatchBoundary() {
  return <CreateStory />;
}
