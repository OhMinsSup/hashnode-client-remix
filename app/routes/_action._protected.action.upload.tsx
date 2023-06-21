import { json, redirect } from "@remix-run/cloudflare";

// api
import { actionErrorWrapper } from "~/api/validation/errorWrapper";
import { RESULT_CODE } from "~/constants/constant";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  return actionErrorWrapper(async () => {
    const { json: data } = await context.api.file.uploadFile(request);
    return json({
      ok: data.resultCode == RESULT_CODE.OK,
      respData: data,
    });
  });
};

export type TagFollowAction = typeof action;

export const loader = () => redirect("/", { status: 404 });

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
