import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import type { RoutesLoaderData } from '~/.server/routes/write/write-layout.loader';
import { Button } from '~/components/ui/button';
import MyDraftCollapsibleWrapper from './MyDraftCollapsibleWrapper';
import MyDraftList from './MyDraftList';

export default function MyDraftProvider() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <MyDraftCollapsibleWrapper totalCount={data.draft}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{' '}
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<></>}>
              <MyDraftList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </MyDraftCollapsibleWrapper>
  );
}
