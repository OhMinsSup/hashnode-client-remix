import { defer } from "@remix-run/cloudflare";

// components
import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";
import { MainHeader } from "~/components/shared/future/MainHeader";

// types
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export const loader = ({ context, request }: LoaderFunctionArgs) => {
  return defer({
    trendingUser: context.api.user.getMainTrendingUsersLimit4(request),
    trendingTag: context.api.tag.getMainTrendingTagsLimit4(request),
    notificationCount: context.api.notification.count(request),
    getDraftList: context.api.post.getMainDraftPostsLimit4(request),
    getLikeList: context.api.post.getMainLikePostsLimit4(request),
  });
};

export type RoutesLoader = typeof loader;

export default function Routes() {
  return (
    <MainLayout
      header={<MainHeader />}
      footer={<MainFooter />}
      sidebar={<HashnodeAside />}
    >
      <Outlet />
    </MainLayout>
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
