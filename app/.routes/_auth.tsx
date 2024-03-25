// remix
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AuthLayout } from "~/components/auth/future/AuthLayout";
import { authLayoutLoader } from "~/.server/routes/auth-layout/auth-layout.loader";
import { authLayoutMeta } from "~/services/seo/auth-layout/auth-layout.meta";

export const loader = authLayoutLoader;

export const meta = authLayoutMeta;

export default function Routes() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
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
