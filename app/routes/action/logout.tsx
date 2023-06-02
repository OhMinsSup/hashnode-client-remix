import { redirect } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  await context.api.user.logout(request);
  return redirect(PAGE_ENDPOINTS.ROOT, {
    headers: context.api.auth.getClearAuthHeaders(),
  });
};

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
