import { json, redirect } from "@remix-run/cloudflare";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { data, status } = await context.api.file.uploadWithCfImages(request);
  return json(data, { status });
};

export type Action = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/action/upload";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
