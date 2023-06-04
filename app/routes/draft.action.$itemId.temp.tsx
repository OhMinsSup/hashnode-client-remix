import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context, params }: ActionArgs) => {
  const itemId = params.itemId?.toString();
  if (!itemId) {
    throw new Response("Not Found", { status: 404 });
  }
  switch (request.method) {
    case "DELETE": {
      const { json: data } = await context.api.draft.deleteDraft(
        itemId,
        request
      );
      return json(data.result);
    }
    case "PUT": {
      const { json: data } = await context.api.draft.updateDraft(
        itemId,
        request
      );
      return json(data.result);
    }
    default: {
      throw new Response("Method not allowed", { status: 405 });
    }
  }
};

export type DraftItemIdTempAction = typeof action;

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
