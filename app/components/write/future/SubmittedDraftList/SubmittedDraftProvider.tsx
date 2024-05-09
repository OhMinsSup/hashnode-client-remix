import React from "react";
import SubmittedDraftList from "./SubmittedDraftList";
import SubmittedDraftCollapsibleWrapper from "./SubmittedDraftCollapsibleWrapper";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import type { RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";

export default function PublishedProvider() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <SubmittedDraftCollapsibleWrapper totalCount={data.submitted}>
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
              <SubmittedDraftList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </SubmittedDraftCollapsibleWrapper>
  );
}
