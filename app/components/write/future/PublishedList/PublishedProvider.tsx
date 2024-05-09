import React from "react";
import PublishedList from "./PublishedList";
import PublishedCollapsibleWrapper from "./PublishedCollapsibleWrapper";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import type { RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useLoaderData } from "@remix-run/react";

export default function PublishedProvider() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <PublishedCollapsibleWrapper totalCount={data.published}>
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
              <PublishedList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PublishedCollapsibleWrapper>
  );
}
