import React, { useMemo } from "react";
import { Outlet } from "@remix-run/react";
import { getSessionApi } from "~/api/user/user";
import { json, redirect } from "@remix-run/cloudflare";

// components
// import { WriteTemplate } from "~/components/write";
// import { WriterHeader } from "~/components/ui/header";

import { PAGE_ENDPOINTS } from "~/constants/constant";

// validation
import { createPostSchema } from "~/api/posts/validation/create";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { FormProvider, useForm } from "react-hook-form";
import { WriteProvider } from "~/stores/useWirteContext";

import draftStylesheetUrl from "~/styles/draft.css";

// types

// types
import type { FileSchema } from "~/api/schema/file";
import type {
  LoaderArgs,
  MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";
import DraftTemplate from "~/components/draft/DraftTemplate";
import { DraftProvider } from "~/context/useDraftContext";

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

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: draftStylesheetUrl }];
};

export const loader = async (args: LoaderArgs) => {
  const { session, header: headers } = await getSessionApi(args);
  if (!session) {
    return redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
      headers,
    });
  }
  return json(
    {
      session,
    },
    {
      headers,
    }
  );
};

export default function DraftRouteLayout() {
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
    <DraftProvider>
      <WriteProvider>
        <FormProvider {...methods}>
          {/* <WriteTemplate header={<WriterHeader />}>
          <Outlet />
        </WriteTemplate> */}
          <DraftTemplate>
            <Outlet />
          </DraftTemplate>
        </FormProvider>
      </WriteProvider>
    </DraftProvider>
  );
}
