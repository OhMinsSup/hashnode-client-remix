import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const { json: data } = await context.api.draft.createDraft(request);
  return json(data.result);
};

export type DraftTempAction = typeof action;

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
