import { type ActionFunctionArgs, redirect } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const action = async ({ request, context }: ActionFunctionArgs) => {
  return await context.api.auth.signoutWithAuth(request);
};

/**
 * @deprecated
 */
export const loader = () => redirect("/", { status: 404 });

/**
 * @deprecated
 */
export const getPath = () => "/action/logout";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
