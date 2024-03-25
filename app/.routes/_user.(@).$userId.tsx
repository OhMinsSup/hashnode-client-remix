// provider
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { UsersLayout } from "~/components/users/future/UsersLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";

export default function Routes() {
  return (
    <UsersLayout header={<MainHeader />}>
      <Outlet />
    </UsersLayout>
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
