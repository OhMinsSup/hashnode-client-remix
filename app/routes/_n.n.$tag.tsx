import React from "react";
import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react";

// api
import {
  getTagApi,
  postTagFollowApi,
  deleteTagFollowApi,
} from "~/api/tags/tags";
import { tagFollowSchema } from "~/api/tags/validation/follow";

// components
import TagDetailInfoBox from "~/components/n/TagDetailInfoBox";
import TabRoutesTags from "~/components/n/TabRoutesTags";

// types
import type {
  LoaderArgs,
  ActionArgs,
  V2_MetaFunction,
} from "@remix-run/cloudflare";
import {
  HTTPErrorWrapper,
  ValidationErrorWrapper,
} from "~/api/validation/common";

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

export type nTagLoader = typeof loader;

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
        return json({ success: true });
      case "DELETE":
        await deleteTagFollowApi(parse.tag, args);
        return json({ success: true });
      default:
        throw new Response("Method not allowed", { status: 405 });
    }
  } catch (error) {
    const error_validation = ValidationErrorWrapper(error);
    if (error_validation) {
      return json(
        { success: false, errors: error_validation.errors },
        { status: error_validation.statusCode }
      );
    }
    const error_http = await HTTPErrorWrapper(error);
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
    throw new Response("Not Found", { status: 404 });
  }
};

export type NDataAction = typeof action;

export const meta: V2_MetaFunction<nTagLoader> = ({ params, data }) => {
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
      <div className="tab-routes__container">
        <TabRoutesTags />
        <Outlet />
      </div>
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
