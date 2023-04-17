import React from "react";
import { json, redirect } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// api
import {
  getTagApi,
  postTagFollowApi,
  deleteTagFollowApi,
} from "~/api/tags/tags";
import {
  tagFollowSchema,
  tagFollowHTTPErrorWrapper,
  tagFollowValidationErrorWrapper,
} from "~/api/tags/validation/follow";

// components
import TagDetailInfoBox from "~/components/n/TagDetailInfoBox";

// types
import type {
  LoaderArgs,
  ActionArgs,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export const loader = async (args: LoaderArgs) => {
  const tag = args.params.tag?.toString();
  if (!tag) {
    throw new Response("Not Found", { status: 404 });
  }

  const { result } = await getTagApi(tag, args);

  const tagInfo = result?.result;

  if (!tagInfo) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    tagInfo,
  });
};

export type NDataLoader = typeof loader;

export const action = async (args: ActionArgs) => {
  const formData = await args.request.formData();

  const form = {
    tag: formData.get("tag")?.toString(),
  };

  try {
    const parse = await tagFollowSchema.parseAsync(form);
    switch (args.request.method) {
      case "POST":
        await postTagFollowApi(parse.tag, args);
        break;
      case "DELETE":
        await deleteTagFollowApi(parse.tag, args);
        break;
      default:
        return redirect(PAGE_ENDPOINTS.N.TAG(parse.tag));
    }

    return redirect(PAGE_ENDPOINTS.N.TAG(parse.tag));
  } catch (error) {
    const error_validation = tagFollowValidationErrorWrapper(error);
    if (error_validation) {
      return json(
        { success: false, errors: error_validation },
        { status: 404 }
      );
    }
    const error_http = await tagFollowHTTPErrorWrapper(error);
    if (error_http) {
      return json(
        {
          success: false,
          errors: error_http.errors,
        },
        {
          status: error_http.statusCode,
        }
      );
    }
  }
};

export type NDataAction = typeof action;

export const meta: V2_MetaFunction<NDataLoader> = ({ params, data }) => {
  const tagInfo = data?.tagInfo ?? null;
  const title = `#${params.tag?.toString()} on Hashnode`;
  const description = `${tagInfo?.name} (${
    tagInfo?.followCount ?? 0
  } followers · ${
    tagInfo?.postCount ?? 0
  } posts) On Hashnode, you can follow your favorite topics and get notified when new posts are published.`;
  const image = "/images/seo_image.png";
  return [
    { title },
    {
      name: "description",
      content: description,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "og:description",
      content: description,
    },
    {
      name: "og:image",
      content: image,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:image",
      content: image,
    },
  ];
};

export default function Tag() {
  return (
    <div className="tag__list-container">
      <TagDetailInfoBox />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
