// remix
import { redirect } from "@remix-run/cloudflare";

// components
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { WriteLayout } from "~/components/write/future/WriteLayout";
import { WriteLeftSide } from "~/components/write/future/WriteLeftSide";
import editorStyles from "~/styles/common/editor.css";
import { WriteProvider } from "~/context/useWriteContext";

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

export type RoutesData = typeof loader;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  switch (request.method) {
    case "POST": {
      const data = await context.api.post.createDraft(request);
      if (!data) {
        throw new Response(JSON.stringify({ ok: false }), {
          status: 400,
        });
      }
      if ("errors" in data) {
        throw new Response(JSON.stringify({ ok: false }), {
          status: 400,
        });
      }
      const dataId = data.dataId;
      if (!dataId) {
        throw new Response(JSON.stringify({ ok: false }), {
          status: 400,
        });
      }
      return redirect(PAGE_ENDPOINTS.WRITE.ID(dataId));
    }
    case "DELETE": {
      const formData = await request.formData();
      const id = formData.get("id")?.toString();
      if (!id) {
        throw new Response(JSON.stringify({ ok: false }), {
          status: 400,
        });
      }
      const ok = await context.api.post.deleteItem(id, request);
      return {
        ok,
      };
    }
    case "PUT": {
      return {
        ok: true,
      };
    }
    default: {
      throw new Response("Method Not Allowed", {
        status: 405,
      });
    }
  }
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
  console.log("error ---->", error);
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
