import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// styles
import { MainLayout } from "~/components/shared/future/MainLayout";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { HashnodeAside } from "~/components/shared/future/HashnodeAside";
import { TagsLayout } from "~/components/n/future/TagsLayout";

export default function Routes() {
  return (
    <MainLayout footer={<MainFooter />} sidebar={<HashnodeAside />}>
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
