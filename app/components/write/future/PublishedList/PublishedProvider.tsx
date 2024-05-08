import React, { useCallback, useState } from "react";
import PublishedList from "./PublishedList";
import PublishedCollapsibleWrapper from "./PublishedCollapsibleWrapper";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";

export default function PublishedProvider() {
  const [totalCount, setTotalCount] = useState(0);

  const handleTotalCount = useCallback((count: number) => {
    setTotalCount(count);
  }, []);

  return (
    <PublishedCollapsibleWrapper totalCount={totalCount}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{" "}
                <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<></>}>
              <PublishedList handleTotalCount={handleTotalCount} />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PublishedCollapsibleWrapper>
  );
}
