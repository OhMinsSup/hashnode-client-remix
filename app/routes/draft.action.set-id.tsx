import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const draftSession = await context.services.draft.getSession(request);
  const form = await request.formData();
  const idx = form.get("idx")?.toString();
  console.log("idx =====>", idx);
  if (!idx) {
    await context.services.draft.removeId(draftSession);
    return json(
      { ok: false, idx: null },
      {
        headers: {
          "Set-Cookie": await context.services.draft.commit(draftSession),
        },
      }
    );
  }
  await context.services.draft.setId(draftSession, idx);
  return json(
    {
      ok: true,
      idx: idx,
    },
    {
      headers: {
        "Set-Cookie": await context.services.draft.commit(draftSession),
      },
    }
  );
};

export type DraftSetIdAction = typeof action;

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
