import { json, redirect } from "@remix-run/cloudflare";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const action = async ({ request, context }: ActionFunctionArgs) => {
  const response = await context.api.file.uploadWithCfImages(request);
  return json(response);
};

/**
 * @deprecated
 */
export type Action = typeof action;

/**
 * @deprecated
 */
export const loader = () => redirect("/", { status: 404 });

/**
 * @deprecated
 */
export const getPath = (redirectUrl: string) =>
  "/action/upload?redirectUrl=" + redirectUrl;

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
