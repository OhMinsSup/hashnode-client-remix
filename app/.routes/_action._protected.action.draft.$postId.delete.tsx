import { json, redirect } from "@remix-run/cloudflare";
import { RESULT_CODE, STATUS_CODE } from "~/constants/constant";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";

/**
 * @deprecated
 */
export const action = async ({
  context,
  request,
  params,
}: ActionFunctionArgs) => {
  const postId = params.postId;
  if (!postId) {
    return json(
      {
        ok: true,
        statusCode: STATUS_CODE.NOT_FOUND,
        resultCode: RESULT_CODE.INVALID,
        error: "Invalid postId",
      },
      { status: STATUS_CODE.NOT_FOUND }
    );
  }
  const data = await context.api.draft.deleteDraft(postId, request);
  return json(data, { status: data.statusCode });
};

/**
 * @deprecated
 */
export type Action = typeof action;

/**
 * @deprecated
 */
export const loader = () => redirect("/", { status: 404 });

/**
 * @deprecated
 */
export const getPath = (id: string) => {
  return `/action/draft/${id}/delete`;
};

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
