import type { ShouldRevalidateFunctionArgs } from '@remix-run/react';
import {
  isRouteErrorResponse,
  Outlet,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import type { RoutesLoaderData } from '~/.server/routes/write/write.$id-layout.loader';
import { WriteProvider } from '~/components/write/context/useWriteContext';
import { LeftSidebar } from '~/components/write/future/LeftSidebar';
import { WriteLayout } from '~/components/write/future/WriteLayout';
import { RequestMethod } from '~/services/libs/request-method.enum';

export { meta } from '~/services/seo/write/write.$id-layout.meta';
export { loader } from '~/.server/routes/write/write.$id-layout.loader';
export { action } from '~/.server/routes/write/write.$id-layout.action';

export const shouldRevalidate = ({
  currentParams,
  nextParams,
  defaultShouldRevalidate,
  formMethod,
  actionResult,
}: ShouldRevalidateFunctionArgs) => {
  const currentId = currentParams.id;
  const nextId = nextParams.id;
  // 같은 id로 GET 요청을 보낸 경우에는 revalidate를 하지 않음
  if (formMethod === RequestMethod.GET && currentId === nextId) {
    return false;
  }

  // 삭제를 한 경우에는 revalidate를 해야함
  if (formMethod === RequestMethod.DELETE && actionResult?.result) {
    return true;
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
