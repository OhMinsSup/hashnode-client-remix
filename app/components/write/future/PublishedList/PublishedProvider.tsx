import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import type { RoutesLoaderData } from '~/.server/routes/write/write-layout.loader';
import { Button } from '~/components/ui/button';
import PublishedCollapsibleWrapper from './PublishedCollapsibleWrapper';
import PublishedList from './PublishedList';

export default function PublishedProvider() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <PublishedCollapsibleWrapper totalCount={data.published}>
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
              <PublishedList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PublishedCollapsibleWrapper>
  );
}
