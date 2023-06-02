import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const draftSession = await context.services.draft.getSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const draftId = form.get("draftId");
  if (!draftId) {
    await context.services.draft.removeId(draftSession);
    return json(
      { ok: false, draftId: null },
      {
        headers: {
          "Set-Cookie": await context.services.draft.commit(draftSession),
        },
      }
    );
  }
  await context.services.draft.setId(draftSession, draftId);
  return json(
    {
      ok: true,
      draftId: draftId,
    },
    {
      headers: {
        "Set-Cookie": await context.services.draft.commit(draftSession),
      },
    }
  );
};

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
