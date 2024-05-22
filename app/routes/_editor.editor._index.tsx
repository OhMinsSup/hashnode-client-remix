import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import { BlocknoteEditor } from '~/components/blocknote-editor';
import { ClientOnly } from '~/components/shared/future/ClientOnly';

export default function Routes() {
  return (
    <ClientOnly fallback={<>Loading...</>}>
      <BlocknoteEditor />
    </ClientOnly>
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
