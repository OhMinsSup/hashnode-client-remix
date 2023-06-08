import { defer, json, redirect } from "@remix-run/cloudflare";
import { Await, Outlet, useLoaderData } from "@remix-run/react";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";
import { parseUrlParams } from "~/utils/util";

// components
import DraftLeftSidebar from "~/components/draft/DraftLeftSidebar.unstable";
import SearchDraftSidebarInput from "~/components/draft/SearchDraftSidebarInput";
import TempDraftSidebar from "~/components/draft/TempDraftSidebar.unstable";

// constants
import { PAGE_ENDPOINTS, RESULT_CODE } from "~/constants/constant";

// types
import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { Suspense } from "react";

export const loader = async ({ context, request }: LoaderArgs) => {
  const params = parseUrlParams(request.url);
  let cursor = undefined;
  if (params.cursor) {
    cursor = parseInt(params.cursor);
  }
  let limit = undefined;
  if (params.limit) {
    limit = parseInt(params.limit);
  }
  let keyword = undefined;
  if (params.keyword) {
    keyword = params.keyword;
  }
  const args = {
    cursor,
    limit,
    ...(keyword && { keyword }),
  } as const;

  return defer({
    temp_promises: context.api.draft.getDrafts(request, args),
  });
};

export type DraftLayoutLoader = typeof loader;

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
  const data = useLoaderData<DraftLayoutLoader>();
  return (
    <div className="draft-template">
      <DraftLeftSidebar
        searchComponent={<SearchDraftSidebarInput />}
        draftComponent={
          <Suspense fallback={<></>}>
            <Await resolve={data.temp_promises} errorElement={<></>}>
              {(data: any) => <TempDraftSidebar data={data?.json?.result} />}
            </Await>
          </Suspense>
        }
      >
        <Outlet />
      </DraftLeftSidebar>
    </div>
  );
}
