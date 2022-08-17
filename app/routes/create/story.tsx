import React from "react";
import {
  ActionButtonGroup,
  CoverImage,
  SubTitle,
  Title,
} from "~/components/posts";
import { Editor } from "~/components/ui/Editor";
import { WriterHeader } from "~/components/ui/Header";

// validation
import { schema } from "~/libs/validation/schema";
import { ValidationError } from "yup";

import editor from "~/styles/editor.css";
import editorToolbar from "~/styles/editor-toolbar.css";

import type { ActionFunction, LinksFunction } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: editor },
    {
      rel: "stylesheet",
      href: editorToolbar,
    },
  ];
};

interface ActonData {
  title: string;
  subTitle?: string | null;
  content: string;
  cover?: {
    idx?: number | null;
    url: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const form = {
    title: formData.get("title"),
    subTitle: formData.get("subTitle"),
    content: formData.get("content"),
    cover: formData.get("cover"),
  };

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
  return (
    <>
      <WriterHeader />
      <div className="mx-auto grid w-full grid-cols-12 px-2 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px] 2xl:grid-cols-10 2xl:px-5">
        <div className="col-span-12 xl:col-span-10 xl:col-start-2 2xl:col-span-6 2xl:col-start-3">
          <div className="relative w-full pt-5">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="create-post"
            >
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
                <Editor />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
