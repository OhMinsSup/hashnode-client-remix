// remix
import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { BlogDetailHeader } from '~/components/blog/future/BlogDetailHeader';
import { BlogFooter } from '~/components/blog/future/BlogFooter';

export { meta } from '~/services/seo/preview/preview.meta';
export { loader } from '~/.server/routes/preview/preview.$id.loader';

export default function Routes() {
  return (
    <>
      <BlogDetailHeader />
      <div className="blog-content-area feed-width mx-auto md:w-2/3">
        asdasd
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
