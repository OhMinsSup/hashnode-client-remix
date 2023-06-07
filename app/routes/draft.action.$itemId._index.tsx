import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import { actionErrorWrapper } from "~/api/validation/errorWrapper";

export const action = async ({ request, context, params }: ActionArgs) => {
  const itemId = params.itemId?.toString();
  if (!itemId) {
    throw new Response("Not Found", { status: 404 });
  }
  return actionErrorWrapper(async () => {
    switch (request.method) {
      case "DELETE": {
        const { json: data } = await context.api.item.deleteItem(
          itemId,
          request
        );
        return json(data.result);
      }
      default: {
        throw new Response("Method not allowed", { status: 405 });
      }
    }
  });
};

export type DraftItemIdIndexAction = typeof action;

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
