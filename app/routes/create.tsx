import React, { useMemo } from "react";
import { Outlet } from "@remix-run/react";

// components
import { WriteTemplate } from "~/components/write";
import { WriterHeader } from "~/components/ui/Header";

// validation
import { createPostSchema } from "~/api/posts/validation/create";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { FormProvider, useForm } from "react-hook-form";
import { WriteContextProvider } from "~/stores/useWirteContext";

// types
import type { FileSchema } from "~/api/schema/file";

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

export default function CreateRouteLayout() {
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
    resolver: zodResolver(createPostSchema),
    defaultValues: intialValues,
  });

  return (
    <WriteContextProvider>
      <FormProvider {...methods}>
        <WriteTemplate header={<WriterHeader />}>
          <Outlet />
        </WriteTemplate>
      </FormProvider>
    </WriteContextProvider>
  );
}
