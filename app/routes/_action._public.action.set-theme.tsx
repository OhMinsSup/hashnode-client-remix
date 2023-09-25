import { json, redirect } from "@remix-run/cloudflare";
import { isTheme } from "~/context/useThemeContext";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get("theme");
  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    });
  }

  const session = await context.services.theme.setTheme(request, theme);
  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await context.services.theme.commit(request, session),
      },
    }
  );
};

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/action/set-theme";

export default function MarkRead() {
  return <div>Oops... You should not see this.</div>;
}
