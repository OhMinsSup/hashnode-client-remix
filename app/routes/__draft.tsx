import React, { useMemo } from "react";
import { Outlet } from "@remix-run/react";
import { getSessionApi } from "~/api/user/user";
import { json, redirect } from "@remix-run/cloudflare";

import { PAGE_ENDPOINTS } from "~/constants/constant";

// validation
import { createPostSchema } from "~/api/posts/validation/create";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { FormProvider, useForm } from "react-hook-form";
import { WriteProvider } from "~/stores/useWirteContext";

import draftStyles from "~/styles/routes/draft.css";

// types

// types
import type { FileSchema } from "~/api/schema/file";
import type {
  LoaderArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import { DraftProvider } from "~/context/useDraftContext";
import DraftTemplate from "~/components/draft/DraftTemplate";

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

const Seo = {
  title: "Editing Article",
  description: "description",
  image: "/images/seo_image.png",
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: Seo.title,
    },
    {
      name: "description",
      content: Seo.description,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "og:description",
      content: Seo.description,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
    {
      name: "twitter:description",
      content: Seo.description,
    },
    {
      name: "twitter:image",
      content: Seo.image,
    },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: draftStyles }];
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
          <DraftTemplate>
            <Outlet />
          </DraftTemplate>
        </FormProvider>
      </WriteProvider>
    </DraftProvider>
  );
}
