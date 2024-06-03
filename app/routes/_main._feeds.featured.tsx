import React from 'react';
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { VirtuosoFeaturedListList } from '~/components/list/future/FeaturedList';

export { loader } from '~/.server/routes/feeds/feeds-featured.loader';

export default function Routes() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <VirtuosoFeaturedListList />
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
