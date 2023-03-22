import React, { useMemo } from "react";
import { Link } from "@remix-run/react";

import { isEmpty } from "~/utils/assertion";
import { getDateFormat } from "~/libs/date";
import { ASSET_URL } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";
import { Icons } from "../shared/Icons";

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
    <div className="post-card-tags">
      {visibleTags?.map((tag) => (
        <Link
          to="/"
          key={`post-item-tag-${tag.id}`}
          className="post-card-tag-item"
        >
          {tag.name}
        </Link>
      ))}
      {tagCount > 0 && (
        <Link to="/" className="post-card-tags-num">
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
    <div className="post-item">
      <div className="post-header">
        <div className="user-wrapper">
          <div className="thumbnail-wrapper">
            <Link to="/">
              <div className="h-full w-full">
                <div className="thumbnail">
                  <img src={avatarUrl} alt="thumbnail" />
                </div>
              </div>
            </Link>
          </div>
          <div className="info-wrapper">
            <div className="username">
              <Link to="/" className="font-semibold text-gray-900">
                {post?.user?.username}
              </Link>
            </div>
            <div className="other">
              <Link to="/">{post?.user?.profile?.name}</Link>
              <span>·</span>
              <Link to="/">{getDateFormat(post?.createdAt)}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="post-body">
        <div className="content-wrapper">
          <h1 className="title">
            <Link to="/">{post?.title}</Link>
          </h1>
          <p className="content">
            <Link to="/">{post?.description}</Link>
          </p>
        </div>
        <div className="image-wrapper">
          <Link to="/" aria-label="Solve Problems like a Developer">
            <img
              src={thumbnailUrl}
              className="min-h-[125px] w-full"
              alt="thumbnail"
            />
          </Link>
        </div>
      </div>
      <div className="post-footer">
        <div className="footer-left-wrapper">
          <div className="left-items-wrapper">
            <div className="mr-3">
              <button type="button" className="btn-bookmark">
                <Icons.Bookmark className="icon__base flex-shrink fill-current" />
              </button>
            </div>
            {isEmpty(tags) ? null : <PostTags tags={tags} id={post.id} />}
          </div>
        </div>
        <div className="footer-right-wrapper">
          <div className="right-items-wrapper">
            <Link to="/" className="icon-wrapper">
              <Icons.LinkHandler className="icon__base mr-2 flex-shrink fill-current" />
              <span>{post?.count?.postLike}</span>
            </Link>
            <Link to="/" className="icon-wrapper">
              <Icons.Comment className="icon__base mr-2 flex-shrink fill-current" />
              <span>0</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
