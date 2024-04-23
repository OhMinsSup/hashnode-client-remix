import { redirect, json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { getAuthFromRequest } from "~/.server/utils/auth.server";
import { clearAuthHeaders } from "~/.server/utils/request.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const session = await getAuthFromRequest(request, context);
  if (!session) {
    return json(
      {
        status: "error" as const,
        result: null,
        message: "You are not logged in.",
      },
      {
        status: 401,
      },
    );
  }

  return json(
    {
      status: "success" as const,
      result: null,
      message: "You have been logged out.",
    },
    {
      headers: clearAuthHeaders(),
    },
  );
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => {
  return "/api/v1/auth/logout";
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
