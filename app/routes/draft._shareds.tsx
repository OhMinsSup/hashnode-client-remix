import React from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

// components
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar.unstable";
import MyDraftSidebar from "~/components/draft/MyDraftSidebar.unstable";
import SearchDraftSidebarInput from "~/components/draft/SearchDraftSidebarInput";
import TempDraftSidebar from "~/components/draft/TempDraftSidebar.unstable";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  switch (request.method) {
    case "POST": {
      return actionErrorWrapper(async () => {
        const { json: data } = await context.api.draft.createDraft(request);
        if (data.resultCode !== RESULT_CODE.OK) {
          const pathname = new URL(request.url).pathname;
          throw redirect(pathname || PAGE_ENDPOINTS.DRAFT.ROOT);
        }
        return json(data.result);
      });
    }
    case "PUT": {
      return actionErrorWrapper(async () => {
        const { json: data } = await context.api.draft.updateDraft(request);
        if (data.resultCode !== RESULT_CODE.OK) {
          const pathname = new URL(request.url).pathname;
          throw redirect(pathname || PAGE_ENDPOINTS.DRAFT.ROOT);
        }
        return json(data.result);
      });
    }
    case "DELETE": {
      return actionErrorWrapper(async () => {
        const { json: data } = await context.api.draft.deleteDraft(request);
        if (data.resultCode !== RESULT_CODE.OK) {
          const pathname = new URL(request.url).pathname;
          throw redirect(pathname || PAGE_ENDPOINTS.DRAFT.ROOT);
        }
        return json(data.result);
      });
    }
    default: {
      throw new Response("Method not allowed", { status: 405 });
    }
  }
};

export default function Routes() {
  return (
    <div className="draft-template">
      <DraftLeftSidebar
        searchComponent={<SearchDraftSidebarInput />}
        draftComponent={<TempDraftSidebar />}
      >
        <Outlet />
      </DraftLeftSidebar>
    </div>
  );
}
