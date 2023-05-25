import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// components
import DraftEditor from "~/components/draft/DraftEditor";
import DraftShardActionFn from "~/components/draft/DraftShardActionFn";

import { redirect, json } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE, STATUS_CODE } from "~/constants/constant";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ context, request }: ActionArgs) => {
  return actionErrorWrapper(async () => {
    const { json: data } = await context.api.item.createItem(request);
    if (data.resultCode !== RESULT_CODE.OK) {
      throw redirect(PAGE_ENDPOINTS.DRAFT.ROOT, {
        status: STATUS_CODE.BAD_REQUEST,
      });
    }
    return json({ ok: true, respData: data });
  });
};

export default function DraftPage() {
  return (
    <DraftShardActionFn>
      <DraftEditor />
    </DraftShardActionFn>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
