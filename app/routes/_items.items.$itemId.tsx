import React from "react";

// utils
import { json } from "@remix-run/cloudflare";

// hooks
import { useLoaderData } from "@remix-run/react";

// api
import { getPostApi } from "~/api/posts/posts";

// components
import {
  PostSubTitle,
  PostThumbnail,
  PostTitle,
  PostWriteInfo,
  PostTags,
  PostWriterFooter,
} from "~/components/__posts";
import Header from "~/components/shared/Header";
import Editor from "~/components/shared/Editor";

// types
import type { LoaderArgs } from "@remix-run/cloudflare";

export const loader = async (args: LoaderArgs) => {
  const id = args.params.itemId;

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

  const { result } = await getPostApi(itemId, args);

  return json({
    item: result.result,
  });
};

export type ItemLoaderData = typeof loader;

const StoriesDetail = () => {
  const { item } = useLoaderData<ItemLoaderData>();

  console.log(item.content);

  return (
    <div className="container__base">
      <Header />
      <main className="pb-24 pt-24">
        <article>
          {/* Wrapper */}
          <div className="relative z-40 mx-auto grid w-full grid-cols-8 sm:max-w-[640px] md:max-w-3xl lg:max-w-5xl">
            {/* Content */}
            <div className="col-span-full lg:col-span-6 lg:col-start-2">
              {/* Thumbnail */}
              <PostThumbnail source={item?.thumbnail} />
              <PostTitle title={item?.title} />
              {item?.subTitle && <PostSubTitle subTitle={item.subTitle} />}
              <PostWriteInfo
                username={item?.user?.username}
                avatarUrl={item?.user?.profile?.avatarUrl}
                createdAt={item?.createdAt}
              />
            </div>
          </div>
          <div className="relative z-30 mx-auto grid w-full grid-flow-row grid-cols-8 sm:max-w-[640px] md:max-w-3xl lg:max-w-5xl">
            <section className="relative col-span-8 mb-10 px-4 md:z-10 lg:col-span-6 lg:col-start-2 lg:px-0">
              <div className="mx-auto mb-10 min-h-[30vh] break-words text-lg text-gray-900">
                <Editor initialData={item.content} readOnly />
              </div>
              <PostTags tags={item.tags} />
              <PostWriterFooter
                username={item?.user?.username}
                avatarUrl={item?.user?.profile?.avatarUrl}
                bio={item?.user?.profile?.bio}
              />
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default StoriesDetail;
