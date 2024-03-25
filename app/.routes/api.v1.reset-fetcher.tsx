import { redirect } from "@remix-run/cloudflare";

export const action = () => {
  return null;
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/api/v1/reset-fetcher";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
