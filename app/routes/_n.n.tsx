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
    notificationCount: context.api.widget.getWidgetNotificationCount(request),
    getDraftList: context.api.widget.getWidgetDraftPostList(request),
    getLikeList: context.api.widget.getWidgetLikePostList(request),
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
