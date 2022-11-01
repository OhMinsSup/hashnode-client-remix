import React, { useCallback, useMemo, useRef } from "react";

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
import { useFetcher } from "@remix-run/react";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { TypographyIcon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/Shared";

import type { FileSchema } from "~/api/schema/file";
import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";

import editorStyles from "@toast-ui/editor/dist/toastui-editor.css";
import { getTargetElement } from "~/libs/browser-utils";

const ToastEditor = React.lazy(
  // @ts-ignore
  () => import("~/components/ui/Editor/ToastEditor")
);

// styles

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
  return [{ rel: "stylesheet", href: editorStyles }];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
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
  };

  console.log(form);

  try {
    const validForm = await schema.write().validate(form, {
      abortEarly: false,
    });
  } catch (error) {
    if (ValidationError.isError(error)) {
      const errors = error.inner.reduce((acc, { path, message }) => {
        if (!path) return acc;
        acc[path] = message;
        return acc;
      }, {} as Record<string, string>);

      const focusId = error.inner[0]?.path;
      return {
        focusId,
        errors,
      };
    }
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
    defaultValues: intialValues,
  });

  const fetcher = useFetcher();

  const wrpperRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { openSubTitle, visible } = useWriteStore();

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    // @ts-ignore
    fetcher.submit(input, {
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
                  <React.Suspense fallback={<>Loading....</>}>
                    <ToastEditor
                      height="600px"
                      initialEditType="wysiwyg"
                      hideModeSwitch={true}
                      placeholder="Write your story..."
                      onChangeHtml={onChangeHtml}
                    />
                  </React.Suspense>
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
