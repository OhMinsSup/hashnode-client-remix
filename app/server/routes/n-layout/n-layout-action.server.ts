import { ActionFunctionArgs } from "@remix-run/cloudflare";

export const nLayoutAction = ({
  context,
  request,
  params,
}: ActionFunctionArgs) => {
  // const tag = params.tag?.toString();
  // if (!tag) {
  //   throw redirect(safeRedirect(PAGE_ENDPOINTS.ROOT));
  // }
  // return context.api.tag.followByTag(tag, request);
  return {};
};
