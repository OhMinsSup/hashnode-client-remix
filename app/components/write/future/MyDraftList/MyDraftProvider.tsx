import React from "react";
import MyDraftList from "./MyDraftList";
import MyDraftCollapsibleWrapper from "./MyDraftCollapsibleWrapper";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import type { RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useLoaderData } from "@remix-run/react";

export default function MyDraftProvider() {
  const data = useLoaderData<RoutesLoaderData>();

  return (
    <MyDraftCollapsibleWrapper totalCount={data.draft}>
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
              <MyDraftList />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </MyDraftCollapsibleWrapper>
  );
}
