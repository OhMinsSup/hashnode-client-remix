import React from "react";
import styles from "./styles.module.css";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import take from "lodash-es/take";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { feedCardDateFormatter } from "~/utils/date";
import { cn } from "~/utils/util";
import { Icons } from "~/components/shared/Icons";
import { LazyImage } from "~/components/shared/future/LazyImage";
import { ClientOnly } from "~/components/shared/future/ClientOnly";

interface HashnodeCardProps {
  index: number;
  data: SerializeSchema.SerializePost;
}

export default function HashnodeCard({ data }: HashnodeCardProps) {
  const avatarUrl = data?.user?.userImage?.avatarUrl;
  const nickname = data?.user?.userProfile?.nickname ?? undefined;
  const username = data?.user?.userProfile?.username;
  const userId = data?.user?.id;
  const publishedAt = data?.publishingDate;

  const postId = data?.id;
  const title = data?.title;
  const content = data?.content?.replace(/<[^>]+>/g, "");
  const image = data?.postImage?.publicUrl;
  const tags = take(data?.postTags ?? [], 2);
  const readCount = data?.readCount ?? 0;
  const likeCount = data?.likeCount ?? 0;

  return (
    <HashnodeCard.Card
      footer={
        <HashnodeCard.Footer
          readCount={readCount}
          likeCount={likeCount}
          postId={postId}
          tags={tags}
        />
      }
    >
      <HashnodeCard.Title
        userId={userId}
        username={username}
        nickname={nickname}
        avatarUrl={avatarUrl}
        publishedAt={publishedAt}
      />
      <HashnodeCard.CardContent
        title={title}
        content={content}
        image={
          <HashnodeCard.Image title={title} image={image} postId={postId} />
        }
        postId={postId}
      />
    </HashnodeCard.Card>
  );
}

interface HashnodeCardTitleProps {
  userId?: string;
  avatarUrl?: string;
  username?: string;
  nickname?: string;
  publishedAt?: string;
}

HashnodeCard.Title = function Item({
  nickname,
  publishedAt,
  username,
  avatarUrl,
  userId,
}: HashnodeCardTitleProps) {
  if (!userId) {
    return null;
  }

  return (
    <div className={styles.title_container}>
      <div className={styles.user_profile_container}>
        <div className="flex flex-row items-center justify-start gap-3">
          <HashnodeCard.ProfileImage
            userId={userId}
            image={avatarUrl}
            username={username}
          />
          <HashnodeCard.ProfileInfo
            userId={userId}
            username={username}
            nickname={nickname}
            publishedAt={publishedAt}
          />
        </div>
      </div>
    </div>
  );
};

interface HashnodeCardCardProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

HashnodeCard.Card = function Item({ children, footer }: HashnodeCardCardProps) {
  return (
    <article className={styles.card}>
      <section className={styles.section_01}>{children}</section>
      <section className={styles.section_02}>{footer}</section>
    </article>
  );
};

interface HashnodeCardContentProps {
  title?: string;
  content?: string;
  image: React.ReactNode;
  postId: string;
}

HashnodeCard.CardContent = function Item({
  title,
  content,
  image,
  postId,
}: HashnodeCardContentProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5 w-full">
      <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <Link to={PAGE_ENDPOINTS.POSTS.ID(postId)}>
              <h1 className={styles.post_title}>{title}</h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link to={PAGE_ENDPOINTS.POSTS.ID(postId)}>
              <span className={styles.post_content}>{content}</span>
            </Link>
          </div>
        </div>
        <div className={styles.post_image}>
          <div className="md:hidden">
            <AspectRatio.Root ratio={16 / 9}>{image}</AspectRatio.Root>
          </div>
          <div className="hidden md:block w-full h-full">{image}</div>
        </div>
      </div>
    </div>
  );
};

interface HashnodeCardImageProps {
  title?: string;
  image?: string;
  postId: string;
}

HashnodeCard.Image = function Item({
  postId,
  title,
  image,
}: HashnodeCardImageProps) {
  return (
    <Link
      className={styles.post_image_mobile}
      to={PAGE_ENDPOINTS.POSTS.ID(postId)}
    >
      <ClientOnly fallback={<LazyImage.Skeleton />}>
        <React.Suspense fallback={<LazyImage.Skeleton />}>
          <LazyImage
            src={image}
            alt={title}
            decoding="async"
            data-nimg="fill"
            className="w-full h-full object-cover"
          />
        </React.Suspense>
      </ClientOnly>
    </Link>
  );
};

interface HashnodeCardProfileImageProps {
  userId: string;
  image?: string;
  username?: string;
}

HashnodeCard.ProfileImage = function Item({
  userId,
  image,
  username,
}: HashnodeCardProfileImageProps) {
  return (
    <Link to={PAGE_ENDPOINTS.USERS.ID(userId)}>
      <div className={styles.profile_image_container}>
        <div className="w-full h-full">
          <img
            alt={username}
            src={image}
            className="w-full h-full object-cover"
            decoding="async"
            data-nimg="fill"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};

interface HashnodeCardProfileInfoProps {
  userId: string;
  username?: string;
  nickname?: string;
  publishedAt?: string;
}

HashnodeCard.ProfileInfo = function Item({
  userId,
  username,
  nickname,
  publishedAt,
}: HashnodeCardProfileInfoProps) {
  const date = publishedAt ? feedCardDateFormatter(publishedAt) : null;
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start items-center text-sm gap-1">
        <div className="flex gap-2">
          <Link to={PAGE_ENDPOINTS.USERS.ID(userId)}>
            <span className={styles.profile_username}>{username}</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center justify-start gap-1">
        <div className="flex-row items-center justify-start gap-1 hidden sm:flex">
          <Link to={PAGE_ENDPOINTS.USERS.ID(userId)}>
            <p className={styles.profile_nickname}>{nickname}</p>
          </Link>
          <p className={styles.profile_nickname}>·</p>
        </div>
        <Link to={PAGE_ENDPOINTS.USERS.ID(userId)}>
          <p className={styles.profile_nickname}>{date}</p>
        </Link>
      </div>
    </div>
  );
};

interface HashnodeCardFooterProps {
  readCount: number;
  likeCount: number;
  postId: string;
  tags: SerializeSchema.SerializePost["postTags"];
}

HashnodeCard.Footer = function Item({
  readCount,
  likeCount,
  tags,
}: HashnodeCardFooterProps) {
  return (
    <div className={styles.post_footer}>
      <div className="flex flex-row items-center justify-start gap-2">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend#comments-list"
        >
          <div className={cn("group", styles.discuss_container)}>
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="M13.333 8.75H7.5m3.333 2.917H7.5m-2.803-6.97A7.5 7.5 0 1 1 7.035 16.89a.885.885 0 0 0-.495-.064l-3.465.578a.417.417 0 0 1-.48-.48l.58-3.458a.886.886 0 0 0-.064-.496 7.503 7.503 0 0 1 1.586-8.274Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
            <span className={styles.span_text}>Discuss</span>
          </div>
        </a>
        {likeCount > 0 && (
          <>
            <p className={styles.dat}>·</p>
            <p>{likeCount} likes</p>
          </>
        )}
        {readCount > 0 && (
          <>
            <p className={styles.dat}>·</p>
            <p>{readCount} reads</p>
          </>
        )}
      </div>
      <div className="flex-row items-center flex gap-1">
        <div className="hidden sm:flex gap-2 items-center">
          {tags.map((tag) => {
            return (
              <HashnodeCard.Tag
                key={`hashnode-card-tag-${tag.id}`}
                name={tag.name}
              />
            );
          })}
          {tags.length > 0 && (
            <div
              data-orientation="horizontal"
              role="separator"
              className={styles.separator}
            />
          )}
        </div>
        <button
          className="bookmark-button"
          aria-label="Bookmark post"
          data-state="closed"
        >
          <span className={styles.bookmark}>
            <Icons.V2.Bookmark />
          </span>
        </button>
      </div>
    </div>
  );
};

interface HashnodeCardTagProps {
  name: string;
}

HashnodeCard.Tag = function Item({ name }: HashnodeCardTagProps) {
  return (
    <Link to={PAGE_ENDPOINTS.N.TAG(name)}>
      <div className={styles.tag}>
        <span className="truncate">{name}</span>
      </div>
    </Link>
  );
};
