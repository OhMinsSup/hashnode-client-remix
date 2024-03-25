import { redirect } from "@remix-run/cloudflare";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const action = async ({ context, request }: ActionFunctionArgs) => {
  return await context.api.tag.upsertTagFollow(request);
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
export const getPath = () => "/action/tag/follow";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
