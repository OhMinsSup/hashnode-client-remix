import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { requireCookie } from "~/.server/utils/auth.server";

type DataSchema =
  FetchRespSchema.Success<SerializeSchema.SerializeGetLeftSidePostCount>;

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const widget = context.agent.api.app.widget;

  const data: SerializeSchema.SerializeGetLeftSidePostCount = {
    submitted: 0,
    draft: 0,
    published: 0,
  };

  try {
    const { cookie } = requireCookie(request);
    if (!cookie) {
      return json(data);
    }

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
