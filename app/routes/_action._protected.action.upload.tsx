import { json, redirect } from "@remix-run/cloudflare";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const response = await context.api.file.uploadWithCfImages(request);
  return json(response);
};

export type Action = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (redirectUrl: string) =>
  "/action/upload?redirectUrl=" + redirectUrl;

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
