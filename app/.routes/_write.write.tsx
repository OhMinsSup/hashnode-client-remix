import editorStyles from "~/styles/common/editor.css";

// remix
import { redirect } from "@remix-run/cloudflare";

// components
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { WriteLayout } from "~/components/write/future/WriteLayout";
import { WriteLeftSide } from "~/components/write/future/WriteLeftSide";
import { WriteProvider } from "~/context/useWriteContext";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";

export const meta: MetaFunction = ({ matches }) => {
  const Seo = {
    title: "Editing Article",
  };
  const rootMeta =
    // @ts-ignore
    matches.filter((match) => match.id === "root")?.at(0)?.meta ?? [];
  const rootMetas = rootMeta.filter(
    // @ts-ignore
    (meta: any) =>
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
  return [{ rel: "stylesheet", href: editorStyles }];
};

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const isAuthenticated = await context.api.auth.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.services.server.getClearAuthHeaders(),
    });
  }
  return null;
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return await context.api.draft.createDraft(request);
};

export type ActionData = typeof action;

export default function Routes() {
  return (
    <WriteProvider>
      <WriteLayout sidebar={<WriteLeftSide />}>
        <Outlet />
      </WriteLayout>
    </WriteProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
