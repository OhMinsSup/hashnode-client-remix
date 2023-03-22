import React, { useMemo } from "react";
import { Link } from "@remix-run/react";

import { isEmpty } from "~/utils/assertion";
import { getDateFormat } from "~/libs/date";
import { ASSET_URL } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";
import { Icons } from "../shared/Icons";

interface PostCardProps {
  post: PostDetailRespSchema;
}

function PostCard({ post }: PostCardProps) {
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
    <div className="main-post-card">
      <div className="main-post-card__header">
        <div className="main-post-card__header-container">
          <div className="thumbnail-container">
            <Link to="/" className="thumbnail-container__link">
              <div className="h-full w-full">
                <div className="thumbnail">
                  <img src={avatarUrl} alt="thumbnail" />
                </div>
              </div>
            </Link>
          </div>
          <div className="userinfo-container">
            <div className="userinfo-container__username">
              <Link to="/">{post?.user?.username}</Link>
            </div>
            <div className="userinfo-container__other">
              <Link to="/">{post?.user?.profile?.name}</Link>
              <span>·</span>
              <Link to="/" className="createAt">
                {getDateFormat(post?.createdAt)}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-post-card__content">
        <div className="main-post-card__content-container">
          <h1 className="main-post-card__content-container__title">
            <Link to="/" className="block">
              {post?.title}
            </Link>
          </h1>
          <p className="main-post-card__content-container__description">
            <Link to="/" className="block">
              {post?.description}
            </Link>
          </p>
        </div>
        <div className="main-post-card__content-image-container">
          <Link
            to="/"
            className="cover-image"
            aria-label="Solve Problems like a Developer"
          >
            <img
              src={thumbnailUrl}
              className="min-h-[100px] w-full"
              alt="thumbnail"
            />
          </Link>
        </div>
      </div>
      <div className="main-post-card__footer">
        <div className="main-post-card__footer-left">
          <div className="footer-left__container">
            <div className="mr-3">
              <button type="button" className="btn-bookmark">
                <Icons.Bookmark className="icon__base flex-shrink fill-current" />
              </button>
            </div>
            {isEmpty(tags) ? null : <PostCard.Tags tags={tags} id={post.id} />}
          </div>
        </div>
        <div className="main-post-card__footer-right">
          <div className="footer-right__container">
            <div className="footer-right__wrapper">
              <Link to="/" className="btn-base">
                <Icons.Like className="icon__base mr-2 stroke-current" />
                <span>{post?.count?.postLike}</span>
              </Link>
              <Link to="/" className="btn-base">
                <Icons.PostComment className="icon__base mr-2 stroke-current" />
                <span>0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

interface PostTagsProps {
  id: number;
  tags: PostDetailRespSchema["tags"];
}

PostCard.Tags = function PostTags({ tags }: PostTagsProps) {
  const visibleTags = useMemo(() => {
    return tags.slice(0, 2);
  }, [tags]);

  const tagCount = useMemo(() => {
    const totalCount = tags.length;
    return totalCount > 2 ? totalCount - 2 : 0;
  }, [tags]);

  return (
    <div className="tag-container">
      {visibleTags?.map((tag) => (
        <Link to="/" key={`post-item-tag-${tag.id}`} className="tag">
          {tag.name}
        </Link>
      ))}
      {tagCount > 0 && (
        <Link to="/" className="tag">
          {`+${tagCount}`}
        </Link>
      )}
    </div>
  );
};
