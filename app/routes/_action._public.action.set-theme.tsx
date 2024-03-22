import { json, redirect } from "@remix-run/cloudflare";
import { isTheme } from "~/context/useThemeContext";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { commit, setTheme } from "~/server/utils/theme.server";

/**
 * @deprecated
 */
export const action = async ({ request }: ActionFunctionArgs) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");
  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

  const session = await setTheme(request, theme);
  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await commit(request, session),
      },
    }
  );
};

/**
 * @deprecated
 */
export const loader = () => redirect("/", { status: 404 });

/**
 * @deprecated
 */
export const getPath = () => "/action/set-theme";

export default function MarkRead() {
  return <div>Oops... You should not see this.</div>;
}
