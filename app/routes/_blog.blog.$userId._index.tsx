// remix
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { BlogEmpty } from '~/components/blog/future/BlogEmpty';

export default function Routes() {
  return <BlogEmpty />;
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
