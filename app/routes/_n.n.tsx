import { defer } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// styles
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";
import { TagsLayout } from "~/components/n/future/TagsLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";
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
      <TagsLayout>
        <Outlet />
      </TagsLayout>
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
