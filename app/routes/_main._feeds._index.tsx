import React from 'react';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { PersonalizedList } from '~/components/list/future/PersonalizedList';

export { loader } from '~/.server/routes/feeds/feeds.loader';

export default function Routes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PersonalizedList />
    </React.Suspense>
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
