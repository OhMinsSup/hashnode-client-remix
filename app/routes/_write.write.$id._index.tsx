import {
  isRouteErrorResponse,
  useLoaderData,
  useNavigation,
  useRouteError,
} from '@remix-run/react';

import { type RoutesLoaderData } from '~/.server/routes/write/write.$id.loader';
import { ClientOnly } from '~/components/shared/future/ClientOnly';
import { WriteFormProvider } from '~/components/write/context/useWriteFormContext';
import { AutoSave } from '~/components/write/future/AutoSave';
import Editor from '~/components/write/future/Editor';
import { WriteEditor } from '~/components/write/future/WriteEditor';
import { WriteEditorHeader } from '~/components/write/future/WriteEditorHeader';
import { WritePageHeader } from '~/components/write/future/WritePageHeader';

export { loader } from '~/.server/routes/write/write.$id.loader';
export { action } from '~/.server/routes/write/write.$id.action';

export default function Routes() {
  const data = useLoaderData<RoutesLoaderData>();

  const initialValues = data?.result as SerializeSchema.SerializePost<false>;

  const navigation = useNavigation();

  return (
    <WriteFormProvider initialValues={initialValues || undefined}>
      <WritePageHeader />
      <WriteEditor header={<WriteEditorHeader />}>
        {navigation.state === 'loading' ? null : (
          <Editor initialHTML={initialValues.content} editable />
        )}
      </WriteEditor>
      <ClientOnly>
        <AutoSave />
      </ClientOnly>
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
