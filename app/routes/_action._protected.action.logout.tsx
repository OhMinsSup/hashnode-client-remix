import { type ActionFunctionArgs, redirect } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  return await context.api.auth.signoutWithAuth(request);
};

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/action/logout";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
