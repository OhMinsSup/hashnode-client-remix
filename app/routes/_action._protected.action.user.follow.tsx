import { redirect } from "@remix-run/cloudflare";

// types
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async ({ context, request }: ActionFunctionArgs) => {
  return await context.api.user.upsertUserFollow(request);
};

export type Action = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (params?: Record<string, any>) => {
  const _base = "/action/user/follow";
  if (params) {
    const _params = new URLSearchParams(params);
    return `${_base}?${_params.toString()}`;
  }
  return _base;
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
