import React, { useMemo } from "react";
import { Link } from "@remix-run/react";
import {
  BookIcon,
  BookmarkIcon,
  CommentIcon,
  FeaturedIcon,
  LikeIcon,
} from "~/components/ui/Icon";

import { isEmpty } from "~/utils/assertion";
import { getDateFormat } from "~/libs/date";
import { ASSET_URL } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface PostTagsProps {
  id: number;
  tags: PostDetailRespSchema["tags"];
}

function PostTags({ tags }: PostTagsProps) {
  const visibleTags = useMemo(() => {
    return tags.slice(0, 2);
  }, [tags]);

  const tagCount = useMemo(() => {
    const totalCount = tags.length;
    return totalCount > 2 ? totalCount - 2 : 0;
  }, [tags]);

  return (
    <div className="mr-2 flex flex-row items-center text-sm font-medium text-gray-600">
      {visibleTags?.map((tag) => (
        <Link
          to="/"
          key={`post-item-tag-${tag.id}`}
          className="mr-1 block w-20 overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-2 py-1 text-center text-gray-500 sm:w-24 md:w-auto md:max-w-[8rem]"
          style={{ lineHeight: "1.625" }}
        >
          {tag.name}
        </Link>
      ))}
      {tagCount > 0 && (
        <Link
          to="/"
          className="mr-1 block overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border px-2 py-1 text-center text-gray-500"
          style={{ lineHeight: "1.625" }}
        >
          {`+${tagCount}`}
        </Link>
      )}
    </div>
  );
}

interface PostItemProps {
  post: PostDetailRespSchema;
}

function PostItem({ post }: PostItemProps) {
  const tags = useMemo(() => {
    return post?.tags ?? [];
  }, [post]);

  const thumbnailUrl = useMemo(() => {
    return post?.thumbnail ?? undefined;
  }, [post]);

  const avatarUrl = useMemo(() => {
    return post?.user?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [post]);

  return (
    <div className="border-b px-5 py-5">
      {/* Header */}
      <div className="relative mb-2" data-header>
        <div className="flex flex-row items-center break-words">
          {/* Tumbnail */}
          <div className="relative mr-3 block rounded-full">
            <Link to="/" className=" relative z-10 block rounded-full border">
              <div className="h-full w-full">
                <div className="relative z-20 h-10 w-10 rounded-full bg-gray-100 xl:h-12 xl:w-12">
                  <img
                    data-src={avatarUrl}
                    className="lazyload blur-up h-full w-full rounded-full object-cover"
                    alt="thumbnail"
                  />
                </div>
              </div>
            </Link>
          </div>
          {/* user info */}
          <div className="text-base">
            <div className="flex flex-row flex-wrap items-center">
              <Link to="/" className="font-semibold text-gray-900">
                {post?.user?.username}
              </Link>
            </div>
            <div className="hidden flex-row flex-wrap items-center text-gray-500 md:flex">
              <Link to="/">{post?.user?.profile?.name}</Link>
              <span className="mx-2 block font-bold text-gray-400">·</span>
              <Link to="/" className="text-gray-500">
                {getDateFormat(post?.createdAt)}
              </Link>
            </div>
          </div>
        </div>
        {/* <Link
          to="/"
          className="text- absolute top-0 right-0 m-0 flex-row items-center rounded-full border bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-amber-400 md:flex"
        >
          <FeaturedIcon className="mr-1 h-4 w-4 fill-current" />
          <span className="tracking-wide text-emerald-600">Featured</span>
        </Link> */}
      </div>
      {/* Header */}
      <div
        className="flex flex-row flex-wrap items-start md:flex-nowrap"
        data-content
      >
        {/* Text Content */}
        <div className="mb-3 w-full md:mb-0 md:flex-1 md:pr-5">
          {/* titme */}
          <h1
            className="mb-2 break-words font-sans text-xl font-bold text-gray-900"
            style={{ wordBreak: "break-word" }}
          >
            <Link to="/" className="block">
              {post?.title}
            </Link>
          </h1>
          {/* created time */}
          {/* <div className="mb-2 flex flex-row flex-wrap items-center">
            <Link
              to="/"
              className="mr-4 flex flex-row items-center font-medium text-gray-900"
            >
              <span className="text-blue-600">
                <BookIcon className="mr-2 h-4 w-4 fill-current" />
              </span>
              <span className="inline-flex">10 min read</span>
            </Link>
          </div> */}
          {/* html content */}
          <p
            style={{ wordBreak: "break-word", lineHeight: "1.375" }}
            className="break-words text-gray-600"
          >
            <Link to="/" className="block">
              {post?.description}
            </Link>
          </p>
        </div>
        {/* Image Content */}
        <div className="w-full flex-shrink-0 md:w-64">
          <Link
            to="/"
            aria-label="Solve Problems like a Developer"
            className="block w-full overflow-hidden rounded-xl border bg-gray-100"
          >
            <img
              src={thumbnailUrl}
              data-src={thumbnailUrl}
              className="lazyload blur-up min-h-[125px] w-full"
              alt="thumbnail"
            />
          </Link>
        </div>
      </div>
      <div
        className="mt-3 flex flex-col-reverse flex-wrap items-center justify-between md:flex-row"
        data-footer
      >
        {/* right */}
        <div className="mt-3 flex w-full flex-row md:mt-0 md:flex-1">
          <div className="flex flex-1 flex-row md:flex-auto">
            {/* bookmark */}
            <div className="mr-3">
              <button
                type="button"
                className="flex  h-10 w-10 flex-row items-center justify-center rounded-full border border-transparent py-3 pt-1 text-center text-base font-medium text-gray-700 outline-none"
              >
                <BookmarkIcon className="h-5 w-5 flex-shrink fill-current" />
              </button>
            </div>
            {/* tags */}
            {isEmpty(tags) ? null : <PostTags tags={tags} id={post.id} />}
          </div>
        </div>
        {/* left */}
        <div className="flex w-full flex-row items-center md:w-auto md:pl-0">
          <div className="flex flex-row flex-wrap items-center">
            {/* Like */}
            <Link
              to="/"
              className="inline-flex flex-row items-center justify-center rounded-full border border-transparent px-3 py-1 text-base font-medium text-gray-700 outline-none"
            >
              <LikeIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
              <span>{post?.count?.postLike}</span>
            </Link>
            {/* Comment */}
            <Link
              to="/"
              className="inline-flex flex-row items-center justify-center rounded-full border border-transparent px-3 py-1 text-base font-medium text-gray-700 outline-none"
            >
              <CommentIcon className="mr-2 h-5 w-5 flex-shrink fill-current" />
              <span>0</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
