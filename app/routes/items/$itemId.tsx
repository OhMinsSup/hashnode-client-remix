import React from "react";
import cookies from "cookie";

// utils
import { json } from "@remix-run/cloudflare";
import { applyAuth } from "~/libs/server/applyAuth";

// hooks
import { useCatch, useLoaderData } from "@remix-run/react";

// api
import { getPostApi } from "~/api/posts/posts";

// components
import { PostThumbnail, PostTitle } from "~/components/posts";
import { Header } from "~/components/ui/Header";

// types
import type { LoaderFunction } from "@remix-run/cloudflare";
import type { PostDetailRespSchema } from "~/api/schema/resp";

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.itemId;

  if (!id) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  // 인티저 영어
  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const token = applyAuth(request);
  const { result } = await getPostApi(itemId, {
    hooks: {
      beforeRequest: [
        (request) => {
          if (token) {
            request.headers.set(
              "Cookie",
              cookies.serialize("access_token", token)
            );
          }
          return request;
        },
      ],
    },
  });

  return json({
    item: result.result,
  });
};

const StoriesDetail = () => {
  const { item } = useLoaderData<{ item: PostDetailRespSchema }>();
  console.log(item);
  return (
    <div className="min-h-screen bg-gray-50 text-zinc-800">
      <Header />
      <div className="relative z-40">
        <main className="pb-24">
          <article>
            {/* Wrapper */}
            <div className="relative z-40 mx-auto grid w-full grid-cols-8 sm:max-w-[640px] md:max-w-3xl lg:max-w-5xl">
              {/* Content */}
              <div className="col-span-1 lg:col-span-6 lg:col-start-2">
                {/* Thumbnail */}
                <PostThumbnail source={item.thumbnail} />
                <PostTitle title={item.title} />
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default StoriesDetail;

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);
  return <StoriesDetail />;
}
