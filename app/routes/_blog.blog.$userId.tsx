// remix
import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { BlogFooter } from '~/components/blog/future/BlogFooter';
import { BlogHeader } from '~/components/blog/future/BlogHeader';

export default function Routes() {
  return (
    <>
      <BlogHeader />
      <div className="blog-content-area feed-width mx-auto md:w-2/3">
        <Outlet />
      </div>
      <BlogFooter />
    </>
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
