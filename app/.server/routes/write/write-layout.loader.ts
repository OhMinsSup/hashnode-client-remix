import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { requireAuthCookie } from "~/.server/utils/auth.server";
import { readHeaderCookie } from "~/.server/utils/request.server";
import { PAGE_ENDPOINTS } from "~/constants/constant";

type DataSchema =
  FetchRespSchema.Success<SerializeSchema.SerializeGetLeftSidePostCount>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  await requireAuthCookie(request, context, PAGE_ENDPOINTS.ROOT);

  const widget = context.agent.api.app.widget;

  const data: SerializeSchema.SerializeGetLeftSidePostCount = {
    submitted: 0,
    draft: 0,
    published: 0,
  };

  try {
    const cookie = readHeaderCookie(request) as unknown as string;
    const response = await widget.getLeftSidePostCountHandler<DataSchema>({
      headers: {
        Cookie: cookie,
      },
    });

    if (response._data) {
      Object.assign(data, response._data.result);
    }
  } catch (error) {
    console.error(error);
  }

  return json(data);
};

export type RoutesLoaderData = typeof loader;
