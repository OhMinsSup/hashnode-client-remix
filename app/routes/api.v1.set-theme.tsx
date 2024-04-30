import { redirect, json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import { isTheme } from "~/context/useThemeContext";
import { commit, setTheme } from "~/.server/utils/theme.server";
import { SearchParams } from "~/.server/utils/request.server";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");
  if (!isTheme(theme)) {
    return json({
      status: "error" as const,
      result: {
        success: false,
      },
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

  const session = await setTheme(request, theme);
  return json(
    {
      status: "success" as const,
      result: {
        success: true,
      },
      message: null,
    },
    {
      headers: {
        "Set-Cookie": await commit(request, session),
      },
    }
  );
};

export type RoutesActionData = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = (searchParams?: SearchParams) => {
  if (searchParams) {
    const query = new URLSearchParams(searchParams).toString();
    if (query) {
      return `/api/v1/set-theme?${query}`;
    }
  }
  return "/api/v1/set-theme";
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
