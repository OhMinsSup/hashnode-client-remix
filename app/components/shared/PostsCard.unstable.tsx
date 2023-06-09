import React, { useCallback, useMemo, useState } from "react";
import { Link, useFetcher } from "@remix-run/react";
import { Icons } from "~/components/shared/Icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { isEmpty } from "~/utils/assertion";
import { getDateFormat } from "~/libs/date";
import classNames from "classnames";

// types
import { PAGE_ENDPOINTS } from "~/constants/constant";
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface PostCardProps {
  post: PostDetailRespSchema;
  ["data-index"]?: number;
  isMyItemPage?: boolean;
}

function PostCard({ post, isMyItemPage, ...props }: PostCardProps, ref: any) {
  const fetcher = useFetcher();

  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const tags = useMemo(() => {
    return post?.tags ?? [];
  }, [post]);

  const to = useMemo(() => {
    return PAGE_ENDPOINTS.ITEMS.ID(post.id);
  }, [post]);

  const onClickDelete = useCallback(() => {
    const isConfim = confirm(
      "정말로 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
    );
    if (isConfim) {
      fetcher.submit(
        {
          id: post.id.toString(),
        },
        {
          method: "DELETE",
          action: PAGE_ENDPOINTS.USERS.ROOT,
          replace: true,
        }
      );
    }
  }, [fetcher, post.id]);

  return (
    <div className="main-post-card" ref={ref} {...props}>
      <div
        ref={setContainer}
        className={classNames("main-post-card__header", {
          "flex items-center justify-between": isMyItemPage,
        })}
      >
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
              <Link to={PAGE_ENDPOINTS.USERS.ID(post?.user?.username)}>
                {post?.user?.username}
              </Link>
            </div>
            <div className="userinfo-container__other">
              <Link to={PAGE_ENDPOINTS.USERS.ID(post?.user?.username)}>
                {post?.user?.profile?.name}
              </Link>
              <span>·</span>
              <Link to={to} className="createAt">
                {getDateFormat(post?.createdAt)}
              </Link>
            </div>
          </div>
        </div>
        {isMyItemPage ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="my-item-delete-btn">
                <Icons.EllipsisVertical className="icon__sm stroke-current" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal container={container}>
              <DropdownMenu.Content
                className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 group relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none outline-none data-[disabled]:pointer-events-none"
                  onClick={onClickDelete}
                >
                  Delete
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-white" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : null}
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

PostCard.Tags = function PostTags({ tags, id }: PostTagsProps) {
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
        <Link
          to={PAGE_ENDPOINTS.N.TAG(tag.name)}
          key={`post-item-tag-${tag.id}`}
          className="tag"
        >
          {tag.name}
        </Link>
      ))}
      {tagCount > 0 && (
        <Link to={PAGE_ENDPOINTS.ITEMS.ID(id)} className="tag">
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

  return <img src={profileData?.url} loading="lazy" alt="user profile" />;
};

PostCard.Thumbnail = function PostThumbnail({ post }: PostCardProps) {
  const thumbnailData = useMemo(() => {
    if (!post) return null;
    return {
      id: `post-thumbnail-${post.id}`,
      url: post.thumbnail ?? undefined,
    };
  }, [post]);

  return (
    <img
      className="min-h-[100px] w-full"
      src={thumbnailData?.url}
      loading="lazy"
      alt="post thumbnail"
    />
  );
};
