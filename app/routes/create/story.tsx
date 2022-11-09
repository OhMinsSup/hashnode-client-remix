import React, { useCallback, useMemo, useRef } from "react";
import cookies from "cookie";
import { redirect } from "@remix-run/cloudflare";
import { applyAuth } from "~/libs/server/applyAuth";

// components
import { ClientOnly } from "remix-utils";
import {
  CoverImage,
  CoverImagePopover,
  SubTitle,
  Title,
  WriteTemplate,
  PublishDrawer,
} from "~/components/write";
import { WriterHeader } from "~/components/ui/Header";

// hooks
import { useWriteStore } from "~/stores/useWriteStore";
import { useCatch, useFetcher } from "@remix-run/react";

// validation
import { getTargetElement } from "~/libs/browser-utils";
import { schema, transform } from "~/libs/validation/schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { TypographyIcon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/Shared";
import { ToastEditor } from "~/components/ui/Editor";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// api
import { createPostsApi } from "~/api/posts";

import type { FileSchema } from "~/api/schema/file";
import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";

import toastUiStyles from "@toast-ui/editor/dist/toastui-editor.css";

export interface FormFieldValues {
  title: string;
  subTitle?: string;
  description: string;
  content: string;
  thumbnail: Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> | null;
  tags?: string[];
  disabledComment: boolean;
  isPublic: boolean;
  hasPublishedTime: boolean;
  publishingDate?: Date;
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: toastUiStyles }];
};

export const action: ActionFunction = async ({ request }) => {
  const token = applyAuth(request);
  if (!token) {
    throw new Error("Not logged in");
  }

  const formData = await request.formData();

  try {
    const body = transform.write(formData);

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
  const intialValues: FormFieldValues = useMemo(() => {
    return {
      title: "",
      subTitle: undefined,
      description: "",
      content: "",
      thumbnail: null,
      tags: undefined,
      disabledComment: false,
      isPublic: false,
      hasPublishedTime: false,
      publishingDate: undefined,
    };
  }, []);

  const methods = useForm<FormFieldValues>({
    resolver: yupResolver(schema.write()),
    defaultValues: intialValues,
  });

  const fetcher = useFetcher();

  const wrpperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { openSubTitle, visible } = useWriteStore();

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
    methods.setValue("thumbnail", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [methods]);

  const onChangeHtml = useCallback(
    (html: string) => {
      methods.setValue("content", html, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [methods]
  );

  const onPublich = useCallback(() => {
    const ele = getTargetElement(formRef);
    ele?.dispatchEvent(
      new Event("submit", {
        cancelable: true,
        bubbles: true,
      })
    );
  }, []);

  const watchThumbnail = methods.watch("thumbnail");

  return (
    <div ref={wrpperRef}>
      <FormProvider {...methods}>
        <WriteTemplate header={<WriterHeader />}>
          <form
            method="post"
            ref={formRef}
            className="create-post"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="relative mb-10 flex flex-row items-center">
              {!watchThumbnail && <CoverImagePopover />}
              <Button
                className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
                aria-label="add post sub title"
                aria-haspopup={visible.subTitle ? "true" : "false"}
                onPress={openSubTitle}
              >
                <TypographyIcon className="mr-2 h-5 w-5 fill-current" />
                <span>Add Subtitle</span>
              </Button>
            </div>
            {watchThumbnail && (
              <CoverImage
                src={watchThumbnail.url}
                onRemove={onRemoveThumbnail}
              />
            )}
            <Title />
            <SubTitle />
            <div className="relative z-20">
              <ClientOnly fallback={<>Loading....</>}>
                {() => (
                  <ToastEditor
                    height="600px"
                    initialEditType="wysiwyg"
                    hideModeSwitch={true}
                    placeholder="Write your story..."
                    onChangeHtml={onChangeHtml}
                  />
                )}
              </ClientOnly>
            </div>
          </form>
          <PublishDrawer onPublich={onPublich} />
        </WriteTemplate>
      </FormProvider>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);
  return <CreateStory />;
}
