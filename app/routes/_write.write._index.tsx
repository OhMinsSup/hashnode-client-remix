// components
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

// types
import { redirect, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async ({ context, request }: LoaderFunctionArgs) => {
  const { list } = await context.api.post.getPostsByDraftList(request);
  console.log("list ---->", list);
  const $firstPost = list.at(0);
  if ($firstPost) return redirect(PAGE_ENDPOINTS.WRITE.ID($firstPost.id));

  try {
    const response = await context.api.post.create(
      { title: "Untitled", isDraft: true },
      request
    );
    if (response.ok) {
      const data =
        await context.services.server.toJSON<FetchRespSchema.DataIDResp>(
          response
        );
      const dataId = data?.result?.dataId;
      if (!dataId) {
        throw new Error("dataId is not exist");
      }
      return redirect(PAGE_ENDPOINTS.WRITE.ID(dataId));
    }

    throw new Error("response is not ok");
  } catch (error) {
    return redirect(PAGE_ENDPOINTS.ROOT);
  }
};

export default function Routes() {
  // TODO: Loading Screen
  return <></>;
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <Routes />;
  } else if (error instanceof Error) {
    return <Routes />;
  } else {
    return <Routes />;
  }
}
