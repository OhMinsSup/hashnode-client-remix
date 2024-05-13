import '~/styles/editor/index.css';

import { isRouteErrorResponse, Outlet, useRouteError } from '@remix-run/react';

import { WriteProvider } from '~/components/write/context/useWriteContext';
import { LeftSidebar } from '~/components/write/future/LeftSidebar';
import { WriteLayout } from '~/components/write/future/WriteLayout';

export { meta } from '~/services/seo/write/write-layout.meta';
export { loader } from '~/.server/routes/write/write-layout.loader';
export { action } from '~/.server/routes/write/write-layout.action';

export default function Routes() {
  return (
    <WriteProvider>
      <div data-id="root">
        <WriteLayout sidebar={<LeftSidebar />}>
          <Outlet />
        </WriteLayout>
      </div>
    </WriteProvider>
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
