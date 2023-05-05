import React, { useMemo } from "react";

// remix
import { json, redirect } from "@remix-run/cloudflare";

// api
import { getSessionApi } from "~/libs/server/session.server";

// components
import DraftTemplate from "~/components/draft/DraftTemplate";
import { Outlet } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// validation
import { createPostSchema } from "~/api/posts/validation/create";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { FormProvider, useForm } from "react-hook-form";
import { DraftProvider } from "~/context/useDraftContext";

// styles
import draftStyles from "~/styles/routes/draft.css";
import drawerStyles from "~/styles/components/draft-drawer.css";

// types
import type { FileSchema } from "~/api/schema/file";
import type {
  LoaderArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/cloudflare";

export interface SeoFormFieldValues {
  title: string;
  desc: string;
  image: string;
}

export interface FormFieldValues {
  title: string;
  subTitle?: string;
  content: string;
  thumbnail: Omit<FileSchema, "createdAt" | "updatedAt" | "deletedAt"> | null;
  tags?: string[];
  disabledComment: boolean;
  publishingDate?: Date;
  seo?: Partial<SeoFormFieldValues>;
}

export const meta: V2_MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Editing Article",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta) =>
      meta.name !== "description" &&
      meta.name !== "og:title" &&
      meta.name !== "og:description" &&
      meta.name !== "twitter:title" &&
      meta.name !== "twitter:description" &&
      !("title" in meta)
  );
  return [
    ...rootMetas,
    {
      title: Seo.title,
    },
    {
      name: "og:title",
      content: Seo.title,
    },
    {
      name: "twitter:title",
      content: Seo.title,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: draftStyles },
    { rel: "stylesheet", href: drawerStyles },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const { type, header: headers } = await getSessionApi(args);
  if (type !== "session") {
    throw redirect(PAGE_ENDPOINTS.AUTH.SIGNIN, {
      headers,
      status: 302,
    });
  }
  return json({ ok: true });
};

export default function DraftRouteLayout() {
  const intialValues: FormFieldValues = useMemo(() => {
    return {
      title: "",
      subTitle: undefined,
      content: "",
      thumbnail: null,
      tags: undefined,
      disabledComment: false,
      publishingDate: undefined,
      seo: {
        title: "",
        desc: "",
        image: "",
      },
    };
  }, []);

  const methods = useForm<FormFieldValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: intialValues,
    reValidateMode: "onChange",
  });

  return (
    <DraftProvider>
      <FormProvider {...methods}>
        <DraftTemplate>
          <Outlet />
        </DraftTemplate>
      </FormProvider>
    </DraftProvider>
  );
}
