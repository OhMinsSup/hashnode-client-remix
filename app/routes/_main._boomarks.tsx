import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type {
  LoaderArgs,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

// styles
// import homeListStyle from "~/styles/routes/home-list.css";
// import homeBookmarkStyle from "~/styles/routes/home-bookmark.css";
import { CategoryBoxWithHashnodeList } from "~/components/shared/future/CategoryBoxWithHashnodeList";

export const links: LinksFunction = () => {
  return [
    // { rel: "stylesheet", href: homeListStyle },
    // { rel: "stylesheet", href: homeBookmarkStyle },
  ];
};

export const loader = async ({ context, request }: LoaderArgs) => {
  const isAuthenticated = await context.api.auth.isAuthenticated(request);
  if (!isAuthenticated) {
    return redirect(PAGE_ENDPOINTS.ROOT, {
      headers: context.services.server.getClearAuthHeaders(),
    });
  }
  return null;
};

export type BookmarksLoader = typeof loader;

export const meta: V2_MetaFunction<BookmarksLoader> = ({ data, matches }) => {
  const Seo = {
    title: "Bookmarks - Hashnode",
    description: "Bookmarks - Hashnode",
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
  ];
};

export default function Routes() {
  return (
    <CategoryBoxWithHashnodeList
      title="Bookmarks"
      description="All articles you have bookmarked on Hashnode"
    >
      <Outlet />
    </CategoryBoxWithHashnodeList>
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
