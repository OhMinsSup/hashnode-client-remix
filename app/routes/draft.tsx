import { useEffect, useMemo } from "react";

// remix
import { json, redirect } from "@remix-run/cloudflare";

// components
import {
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar";
import MyDraftSidebar from "~/components/draft/MyDraftSidebar";
import WriteDraftSidebar from "~/components/draft/WriteDraftSidebar";
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// validation
import { createPostSchema } from "~/api/posts/validation/create";
import { zodResolver } from "@hookform/resolvers/zod";

// hooks
import { FormProvider, useForm } from "react-hook-form";
import { DraftProvider } from "~/context/useDraftContext";
import { hashnodeDB } from "~/libs/db/db";

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
import type { DraftSetIdAction } from "./draft.action.set-id";

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

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.user.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getClearAuthHeaders(),
    });
  }
  const session = await context.services.draft.getSession(request);
  const tempIdx = await context.services.draft.getId(session);
  return json({
    tempIdx: tempIdx ? `${tempIdx}` : null
  });
};

export type DraftLoader = typeof loader;

export default function DraftRouteLayout() {
  const fetcher = useFetcher<DraftSetIdAction>();
  const { tempIdx } = useLoaderData<DraftLoader>();

  console.log(tempIdx);

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

  const { dirtyFields } = methods.formState;

  const debounced = useDebounceFn(
    async (id: string | null) => {
      const input = methods.watch();
      console.log("input", input);
      try {
        if (id) {
          console.log("update");
          await hashnodeDB.updateDraft(id, input);
          return;
        }
        console.log("add");
        const indexableType = await hashnodeDB.addDraft(input);
        const idx = parseInt(indexableType.toString(), 10);
        if (indexableType && !Number.isNaN(idx)) {
          fetcher.submit(
            {
              idx: idx.toString(),
            },
            {
              method: "POST",
              action: "/draft/action/set-id",
              replace: true,
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    {
      wait: 250,
      trailing: true,
    }
  );

  useDeepCompareEffect(() => {
    const idx = fetcher.data?.idx ?? tempIdx ?? null;
    debounced.run(idx);
  }, [dirtyFields, fetcher.data, tempIdx]);

  useEffect(() => {
    if (fetcher.data) {
      console.log("fetcher.data", fetcher.data);
    }
  }, [fetcher.data]);

  return (
    <DraftProvider>
      <FormProvider {...methods}>
        <div className="draft-template">
          <DraftLeftSidebar
            myDrafts={<MyDraftSidebar />}
            writeDraft={<WriteDraftSidebar />}
          />
          <Outlet />
        </div>
      </FormProvider>
    </DraftProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
