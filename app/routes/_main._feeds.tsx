import { json, unstable_defineLoader } from '@remix-run/cloudflare';
import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { MainFeedTabs } from '~/components/shared/future/MainFeedTabs';

export const loader = unstable_defineLoader(({ context }) => {
  context.logger.log('hello');
  return json({ hello: 'world' });
});

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
