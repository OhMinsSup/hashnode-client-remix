import { redirect, json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import {
  clearAuthHeaders,
  combineHeaders,
} from "~/.server/utils/request.server";
import { parseUrlParams } from "~/utils/utils";
import { safeRedirect } from "remix-utils/safe-redirect";

type SearchParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams
  | undefined;

export const action = async ({ request, context }: ActionFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);
  const params = parseUrlParams(request.url);
  const redirectUrl = params.redirectUrl as string | undefined;
  if (redirectUrl) {
    throw redirect(safeRedirect(redirectUrl), {
      headers: combineHeaders(clearAuthHeaders()),
    });
  }

  return json(
    {
      status: "success",
      result: null,
      message: "로그아웃 되었습니다.",
    },
    {
      headers: combineHeaders(clearAuthHeaders()),
    }
  );
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `/api/v1/logout?${query}`;
    }
  }
  return "/api/v1/logout";
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
