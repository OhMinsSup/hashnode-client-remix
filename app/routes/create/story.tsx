import React, { useCallback, useRef } from "react";

// components
import { ClientOnly } from "remix-utils";
import {
  CoverImage,
  CoverImagePopover,
  SubTitle,
  Title,
  WriteTemplate,
} from "~/components/write";
import { Editor } from "~/components/ui/Editor";
import { WriterHeader } from "~/components/ui/Header";

// hooks
import { useWriteStore } from "~/stores/useWriteStore";
import { useFetcher } from "@remix-run/react";
import { useMedia } from "react-use";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { TypographyIcon } from "~/components/ui/Icon";
import { ActionButton } from "~/components/write/_components";
import { Button } from "~/components/ui/Shared";
import Drawer from "rc-drawer";

import type { FileSchema } from "~/api/schema/file";
import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";

// styles
import editor from "~/styles/editor.css";
import editorToolbar from "~/styles/editor-toolbar.css";
import X from "~/components/ui/Icon/X";

interface FormFieldValues {
  title: string;
  subTitle?: string;
  thumbnail: Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> | null;
}

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: editor },
    {
      rel: "stylesheet",
      href: editorToolbar,
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
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
  const methods = useForm<FormFieldValues>();

  const fetcher = useFetcher();

  const wrpperRef = useRef<HTMLDivElement>(null);

  const is768px = useMedia("(min-width: 768px)");

  const { openSubTitle, visible, closeSetting } = useWriteStore();

  const onSubmit: SubmitHandler<FormFieldValues> = (input) => {
    fetcher.submit(input as Record<string, any>, {
      method: "post",
    });
  };

  const onRemoveThumbnail = useCallback(() => {
    methods.setValue("thumbnail", null, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [methods]);

  const watchThumbnail = methods.watch("thumbnail");

  return (
    <div ref={wrpperRef}>
      <FormProvider {...methods}>
        <WriteTemplate header={<WriterHeader />}>
          <form
            method="post"
            className="create-post"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {/* Step1 */}
            <div className="relative mb-10 flex flex-row items-center">
              {!watchThumbnail && <CoverImagePopover />}
              <ActionButton
                className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none"
                icon={<TypographyIcon className="mr-2 h-5 w-5 fill-current" />}
                text="Add Subtitle"
                aria-label="add post sub title"
                aria-haspopup={visible.subTitle ? "true" : "false"}
                onPress={openSubTitle}
              />
            </div>
            {/* Cover Image */}
            {watchThumbnail && (
              <CoverImage
                src={watchThumbnail.url}
                onRemove={onRemoveThumbnail}
              />
            )}
            {/* Step2 */}
            <Title />
            {/* SubTitle */}
            <SubTitle />
            {/* Step3 */}
            <div className="relative z-20">
              <ClientOnly fallback={<>Loading....</>}>
                {() => <Editor />}
              </ClientOnly>
            </div>
          </form>

          <Drawer
            open={visible.setting}
            placement="right"
            width={is768px ? "40%" : "100%"}
            destroyOnClose
            onClose={closeSetting}
          >
            <div className="px-4 pt-4 pb-10 md:px-6">
              <div className="relative">
                <div className="flex flex-row items-center justify-between border-b pb-4">
                  <Button onPress={() => {}}>
                    <X />
                    <span className="sr-only">Close</span>
                  </Button>
                  <Button
                    onPress={() => {}}
                    className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
                  >
                    Publish
                  </Button>
                </div>
              </div>
              content
            </div>
          </Drawer>
        </WriteTemplate>
      </FormProvider>
    </div>
  );
}
