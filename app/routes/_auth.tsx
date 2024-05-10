// remix
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { AuthLayout } from "~/components/auth/future/AuthLayout";

export { meta } from "~/services/seo/auth/auth-layout.meta";
export { loader } from "~/.server/routes/auth/auth-layout.loader";

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
