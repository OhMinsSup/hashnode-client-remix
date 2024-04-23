import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { widgetLoader } from "~/.server/routes/widget/widget.loader";
import { MainFooter } from "~/components/shared/future/MainFooter";
import { MainHeader } from "~/components/shared/future/MainHeader";
import { MainLayout } from "~/components/shared/future/MainLayout";

export const loader = widgetLoader;

export default function Routes() {
  return (
    <MainLayout header={<MainHeader />} footer={<MainFooter />}>
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
