import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { MainFeedTabs } from '~/components/shared/future/MainFeedTabs';

export default function Routes() {
  return (
    <MainFeedTabs>
      <Outlet />
    </MainFeedTabs>
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
