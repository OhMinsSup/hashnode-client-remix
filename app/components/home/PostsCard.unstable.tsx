import React, { Suspense, useCallback, useMemo } from "react";
import { Link } from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import SuspenseImage from "~/components/shared/SuspenseImage";
import { ClientOnly } from "remix-utils";

import { isEmpty } from "~/utils/assertion";
import { getDateFormat } from "~/libs/date";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface PostCardProps {
  post: PostDetailRespSchema;
  ["data-index"]?: number;
}

function PostCard({ post, ...props }: PostCardProps, ref: any) {
  const tags = useMemo(() => {
    return post?.tags ?? [];
  }, [post]);

  const to = useMemo(() => {
    return PAGE_ENDPOINTS.ITEMS.ID(post.id);
  }, [post]);

  return (
    <div className="main-post-card" ref={ref} {...props}>
      <div className="main-post-card__header">
        <div className="main-post-card__header-container">
          <div className="thumbnail-container">
            <Link to={to} className="thumbnail-container__link">
              <div className="h-full w-full">
                <div className="thumbnail">
                  <PostCard.Profile post={post} />
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
            <Link to={to} className="block">
              {post?.title}
            </Link>
          </h1>
          <p className="main-post-card__content-container__description">
            <Link to={to} className="block">
              {post?.description}
            </Link>
          </p>
        </div>
        <div className="main-post-card__content-image-container">
          <Link
            to={to}
            className="cover-image"
            aria-label="Solve Problems like a Developer"
          >
            <PostCard.Thumbnail post={post} />
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

export default React.forwardRef(PostCard);

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

PostCard.Profile = function PostProfile({ post }: PostCardProps) {
  const profileData = useMemo(() => {
    if (!post) return null;
    const url = post.user?.profile?.avatarUrl;
    return {
      id: `profile-${post.user?.id}`,
      url: url || "/images/default_profile.png",
    };
  }, [post]);

  const renderSkeleton = useCallback(() => {
    return <img className="scale-110 blur-2xl grayscale" alt="thumbnail" />;
  }, []);

  return (
    <ClientOnly fallback={renderSkeleton()}>
      {() => (
        <Suspense fallback={renderSkeleton()}>
          <SuspenseImage data={profileData} alt="thumbnail" />
        </Suspense>
      )}
    </ClientOnly>
  );
};

PostCard.Thumbnail = function PostThumbnail({ post }: PostCardProps) {
  const thumbnailData = useMemo(() => {
    if (!post) return null;
    return {
      id: `post-thumbnail-${post.id}`,
      url: post.thumbnail ?? undefined,
    };
  }, [post]);

  const renderSkeleton = useCallback(() => {
    return (
      <img
        className="min-h-[100px] w-full scale-110 blur-2xl grayscale"
        alt="thumbnail"
      />
    );
  }, []);

  return (
    <ClientOnly fallback={renderSkeleton()}>
      {() => (
        <Suspense fallback={renderSkeleton()}>
          <SuspenseImage
            data={thumbnailData}
            className="min-h-[100px] w-full"
            alt="thumbnail"
          />
        </Suspense>
      )}
    </ClientOnly>
  );
};
