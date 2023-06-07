import { useMemo } from "react";

// remix
import { redirect } from "@remix-run/cloudflare";

// components
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

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

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.user.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.api.auth.getClearAuthHeaders(),
    });
  }
  return null;
};

export type DraftLoader = typeof loader;

export default function Routes() {
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

  // const watchAll = useWatch({
  //   control: methods.control,
  // });

  // const fetcher_temp = useFetcher();
  // const fetcher_itemId_temp = useFetcher<DraftItemIdTempAction>();

  // const debounced_update = useDebounceFn(
  //   (dataId: number) => {
  //     fetcher_itemId_temp.submit(
  //       {
  //         body: Json.stringify(watchAll),
  //       },
  //       {
  //         method: "PUT",
  //         action: `/draft/action/${dataId}/temp`,
  //         replace: true,
  //       }
  //     );
  //   },
  //   {
  //     wait: 250,
  //     trailing: true,
  //   }
  // );

  // useDeepCompareEffect(() => {
  //   if (fetcher_temp.data && fetcher_temp.data.dataId) {
  //     debounced_update.run(fetcher_temp.data.dataId);
  //   }
  // }, [watchAll, fetcher_temp.data]);

  return (
    <DraftProvider>
      <FormProvider {...methods}>
        <Outlet />
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
