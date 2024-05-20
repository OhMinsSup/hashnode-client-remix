import React from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '~/components/ui/button';
import SubmittedDraftCollapsibleWrapper from './SubmittedDraftCollapsibleWrapper';
import SubmittedDraftList from './SubmittedDraftList';

export default function PublishedProvider() {
  return (
    <SubmittedDraftCollapsibleWrapper>
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
              <SubmittedDraftList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </SubmittedDraftCollapsibleWrapper>
  );
}
