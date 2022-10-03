import React from "react";
import { ClientOnly } from "remix-utils";
import {
  ActionButtonGroup,
  CoverImage,
  SubTitle,
  Title,
  WriteTemplate,
} from "~/components/write";
import { Editor } from "~/components/ui/Editor";
import { WriterHeader } from "~/components/ui/Header";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

import editor from "~/styles/editor.css";
import editorToolbar from "~/styles/editor-toolbar.css";

import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";

import { Form, useFetcher } from "@remix-run/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

interface FormFieldValues {
  title: string;
  subTitle?: string;
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
  const methods = useForm();

  const fetcher = useFetcher();

  const onSubmit = () => {
    fetcher.submit(
      {
        title: "create story",
        subTitle: "create story",
      },
      {
        method: "post",
      }
    );
  };

  return (
    <WriteTemplate header={<WriterHeader />}>
      <FormProvider {...methods}>
        <form
          method="post"
          className="create-post"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <button type="submit">임시 버튼</button>
          {/* Step1 */}
          <ActionButtonGroup />
          {/* Cover Image */}
          <CoverImage />
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
      </FormProvider>
    </WriteTemplate>
  );
}
