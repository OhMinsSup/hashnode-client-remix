import React from 'react';
import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';

import { type RoutesLoaderData } from '~/.server/routes/write/write.$id.loader';
import { WriteFormProvider } from '~/components/write/context/useWriteFormContext';
import { WriteEditor } from '~/components/write/future/WriteEditor';
import { WriteEditorHeader } from '~/components/write/future/WriteEditorHeader';
import { WritePageHeader } from '~/components/write/future/WritePageHeader';

export { loader } from '~/.server/routes/write/write.$id.loader';
export { action } from '~/.server/routes/write/write.$id.action';

const Editor = React.lazy(() => import('~/components/write/future/Editor'));

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  const initialValues = data?.result as SerializeSchema.SerializePost<false>;

  const navigation = useNavigation();

  return (
    <WriteFormProvider initialValues={initialValues || undefined}>
      <WritePageHeader />
      <WriteEditor header={<WriteEditorHeader />}>
        {navigation.state === 'loading' ? null : (
          <React.Suspense fallback={<></>}>
            <Editor initialContent={initialValues?.content} />
          </React.Suspense>
        )}
      </WriteEditor>
    </WriteFormProvider>
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
