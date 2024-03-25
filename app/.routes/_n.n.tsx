import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";
import { TagsLayout } from "~/components/n/future/TagsLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";
import { widgetLoader } from "~/.server/routes/widget/widget.loader";

export const loader = widgetLoader;

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
