import '~/styles/editor/index.css';

import type { ShouldRevalidateFunctionArgs } from '@remix-run/react';
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/write/write-layout.loader';
import { WriteProvider } from '~/components/write/context/useWriteContext';
import { LeftSidebar } from '~/components/write/future/LeftSidebar';
import { WriteLayout } from '~/components/write/future/WriteLayout';

export { meta } from '~/services/seo/write/write-layout.meta';
export { loader } from '~/.server/routes/write/write-layout.loader';
export { action } from '~/.server/routes/write/write-layout.action';

export const shouldRevalidate = ({
  currentParams,
  nextParams,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) => {
  const currentId = currentParams.id;
  const nextId = nextParams.id;
  if (currentId === nextId) {
    return false;
  }
  return defaultShouldRevalidate;
};

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <WriteProvider count={data?.result}>
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
