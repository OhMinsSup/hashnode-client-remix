import {
  json,
  redirect,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from "@remix-run/cloudflare";

// api
// import { actionErrorWrapper } from "~/api/validation/errorWrapper";
// import { RESULT_CODE } from "~/constants/constant";

// types
import type { ActionArgs } from "@remix-run/cloudflare";

export const action = async ({ request, context }: ActionArgs) => {
  const uploadHandler = createMemoryUploadHandler({
    maxPartSize: 500_000,
  });
  const formData = await parseMultipartFormData(request, uploadHandler);
  const file = formData.get("file");
  console.log(file);
  return json({
    ok: true,
  });
  // const uploadHandler = createMemoryUploadHandler();
  // return actionErrorWrapper(async () => {
  //   const { json: data } = await context.api.file.uploadFile(request);
  //   return json({
  //     ok: data.resultCode == RESULT_CODE.OK,
  //     respData: data,
  //   });
  // });
};

export type Action = typeof action;

export const loader = () => redirect("/", { status: 404 });

export const getPath = () => "/action/upload";

export default function Routes() {
  return <div>Oops... You should not see this.</div>;
}
