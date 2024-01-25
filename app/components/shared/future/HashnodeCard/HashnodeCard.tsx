import React, { useMemo } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import take from "lodash-es/take";
import type { SerializeFrom } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { TipTapEditor } from "../Tiptap";

export default function HashnodeCard() {
  return null;
}

interface HashnodeCardV2Props {
  index: number;
  data: SerializeFrom<SerializeSchema.SerializePost>;
}

HashnodeCard.V2 = React.memo(function HashnodeCardV2({
  data,
}: HashnodeCardV2Props) {
  const post = useMemo(() => {
    const _image = data?.postImage ?? {};
    const _tags = data?.postTags ?? [];

    return {
      postId: data.id,
      title: data?.title,
      content: data?.content,
      image: _image?.publicUrl,
      publishedAt: data?.publishingDate
        ? new Date(data.publishingDate).toLocaleString()
        : null,
      tags: take(_tags, 2),
      readCount: data?.readCount ?? 0,
      likeCount: data?.likeCount ?? 0,
    };
  }, [data]);

  const profile = useMemo(() => {
    const _user = data?.user ?? {};
    const _profile = _user?.userProfile ?? {};
    const _image = _user?.userImage ?? {};
    return {
      userId: _user?.id,
      username: _profile?.username,
      nickname: _profile?.nickname,
      image: _image?.avatarUrl,
    };
  }, [data]);

  return (
    <HashnodeCard.Card
      footer={
        <HashnodeCard.Footer
          readCount={post.readCount}
          likeCount={post.likeCount}
          postId={post.postId}
          tags={post.tags}
        />
      }
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-3">
            <HashnodeCard.ProfileImage
              userId={profile.userId}
              image={profile.image}
              username={profile.username}
            />
            <div className="flex flex-col">
              <div className="flex flex-row justify-start items-center text-sm gap-1">
                <div className="flex gap-2">
                  <Link to={PAGE_ENDPOINTS.USERS.ID(profile.userId)}>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                      {profile.username}
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex flex-row items-center justify-start gap-1">
                <div className="flex-row items-center justify-start gap-1 hidden sm:flex">
                  <Link to={PAGE_ENDPOINTS.USERS.ID(profile.userId)}>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                      {profile.nickname}
                    </p>
                  </Link>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                    ·
                  </p>
                </div>
                <Link to={PAGE_ENDPOINTS.USERS.ID(profile.userId)}>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                    {post.publishedAt}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HashnodeCard.CardContent
        title={post.title}
        content={<HashnodeCard.Text content={post.content} />}
        image={
          <HashnodeCard.Image
            title={post.title}
            image={post.image}
            postId={post.postId}
          />
        }
        postId={post.postId}
      />
    </HashnodeCard.Card>
  );
});

interface HashnodeCardCardProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

HashnodeCard.Card = function Item({ children, footer }: HashnodeCardCardProps) {
  return (
    <article className="w-full first-of-type:border-t-0 border-t lg:!border border-slate-200 dark:border-slate-800/80 rounded-none lg:rounded-2xl pt-5 md:pt-8 lg:p-6 lg:pb-5 bg-white dark:bg-slate-950 flex flex-col gap-4 md:gap-5">
      <section className="flex flex-col gap-2 sm:gap-4">{children}</section>
      <section className="flex flex-col gap-5">{footer}</section>
    </article>
  );
};

interface HashnodeCardContentProps {
  title?: string;
  content: React.ReactNode;
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
        <div className="flex flex-col gap-1 ">
          <div>
            <Link to={PAGE_ENDPOINTS.POSTS.ID(postId)}>
              <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">
                {title}
              </h1>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link to={PAGE_ENDPOINTS.POSTS.ID(postId)}>{content}</Link>
          </div>
        </div>
        <div className="w-full rounded-xl md:rounded-lg bg-slate-100 dark:bg-slate-800 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
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
      className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800"
      to={PAGE_ENDPOINTS.POSTS.ID(postId)}
    >
      <img
        alt={title}
        src={image}
        decoding="async"
        data-nimg="fill"
        className="w-full h-full"
      />
    </Link>
  );
};

interface HashnodeCardProfileImageProps {
  image?: string;
  username?: string;
  userId: string;
}

HashnodeCard.ProfileImage = function Item({
  userId,
  image,
  username,
}: HashnodeCardProfileImageProps) {
  return (
    <Link to={PAGE_ENDPOINTS.USERS.ID(userId)}>
      <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
        <div className="css-sflqu2">
          <img
            alt={username}
            src={image}
            decoding="async"
            data-nimg="fill"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};

interface HashnodeCardTextProps {
  content?: string;
}

HashnodeCard.Text = React.memo(function Item({
  content,
}: HashnodeCardTextProps) {
  return (
    <span className="text-base hidden font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer md:line-clamp-2">
      <TipTapEditor value={content ?? undefined} editable={false} />
    </span>
  );
});

interface HashnodeCardFooterProps {
  readCount: number;
  likeCount: number;
  postId: string;
  tags: SerializeFrom<SerializeSchema.SerializePost>["postTags"];
}

HashnodeCard.Footer = function Item({
  readCount,
  likeCount,
  tags,
}: HashnodeCardFooterProps) {
  return (
    <div className="flex flex-row items-center justify-between text-slate-600 dark:text-slate-300 text-sm">
      <div className="flex flex-row items-center justify-start gap-2">
        <a
          target="_blank"
          rel="noopener"
          href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend#comments-list"
        >
          <button
            className="w-fit flex items-center justify-center gap-1.5 rounded-full px-1 py-1.5 font-sans font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 bg-transparent group cursor-pointer"
            aria-label="Comment"
          >
            <span className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600">
              <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                <path
                  stroke="currentColor"
                  d="M13.333 8.75H7.5m3.333 2.917H7.5m-2.803-6.97A7.5 7.5 0 1 1 7.035 16.89a.885.885 0 0 0-.495-.064l-3.465.578a.417.417 0 0 1-.48-.48l.58-3.458a.886.886 0 0 0-.064-.496 7.503 7.503 0 0 1 1.586-8.274Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                ></path>
              </svg>
            </span>
            Discuss
          </button>
        </a>
        <p className="text-slate-400 dark:text-slate-500">·</p>
        <p>{likeCount} likes</p>
        <p className="text-slate-400 dark:text-slate-500">·</p>
        <p>{readCount} reads</p>
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
          <div
            data-orientation="horizontal"
            role="separator"
            className="h-3 w-px bg-slate-200 dark:bg-slate-800"
          ></div>
        </div>
        <button
          className="bookmark-button"
          aria-label="Bookmark post"
          data-state="closed"
        >
          <span className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600">
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="M10 6.77v1.874m0 0v1.875m0-1.875h1.875m-1.875 0H8.125M7.083 2.5h5.834a2.5 2.5 0 0 1 2.5 2.5v12.5l-4.98-3.065a.833.833 0 0 0-.874 0L4.583 17.5V5a2.5 2.5 0 0 1 2.5-2.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
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
      <div className="flex justify-start items-center rounded-full px-2 py-1 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700 w-min max-w-[126px] truncate text-left">
        <span className="truncate">{name}</span>
      </div>
    </Link>
  );
};
