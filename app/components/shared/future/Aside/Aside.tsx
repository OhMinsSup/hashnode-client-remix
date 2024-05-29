import React from 'react';
import { Link } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { distanceInWordsToNow } from '~/libs/date';
import { cn } from '~/services/libs';

interface AsideProps {
  draftTotal?: number;
  drafts?: SerializeSchema.SerializePost<false>[];
}

export default function Aside({ drafts, draftTotal }: AsideProps) {
  return (
    <div className="hidden xl:block">
      <div
        className="mb-5 flex flex-col gap-6 sm:w-[340px] xl:mt-8"
        id="main-aside"
      >
        <Aside.Container
          title="Changelog"
          subheading={
            <Button variant="ghost" type="button" size="icon">
              <Icons.close />
            </Button>
          }
        >
          adsa
        </Aside.Container>
        {drafts && drafts.length > 0 ? (
          <Aside.Container
            title={`Drafts (${draftTotal})`}
            subheading={
              <Link
                to={PAGE_ENDPOINTS.WRITE.ROOT}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                  }),
                )}
              >
                See all
              </Link>
            }
          >
            <div className="space-y-3">
              {drafts.map((draft) => (
                <DraftCard key={`draft-${draft.id}`} draft={draft} />
              ))}
            </div>
          </Aside.Container>
        ) : null}
        <Aside.Container title="Trending Articles">adsa</Aside.Container>
        <Aside.Container title="Top commenters this week">adsa</Aside.Container>
        <Aside.Container title="Bookmarks">adsa</Aside.Container>
        <Aside.Container title="Team Blogs">adsa</Aside.Container>
        <Aside.Footer />
      </div>
    </div>
  );
}

interface ContainerProps {
  title: string;
  subheading?: React.ReactNode;
  children: React.ReactNode;
}

Aside.Container = function Item({
  children,
  title,
  subheading,
}: ContainerProps) {
  return (
    <div className="flex w-full flex-col justify-start gap-3.5 rounded-2xl border border-slate-200 px-6 py-5 dark:border-slate-800/80 ">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h2>
        {subheading}
      </div>
      <div>{children}</div>
    </div>
  );
};

Aside.Footer = function Item() {
  return (
    <div className="flex w-full flex-col justify-start gap-3.5 rounded-2xl border border-slate-200 border-transparent bg-slate-50 px-6  py-5 dark:border-slate-800/80 dark:bg-slate-900">
      <div className="grid grid-cols-2 gap-y-2 ">
        <h3 className="col-span-2 text-base font-medium text-slate-700 dark:text-slate-200">
          External links
        </h3>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener"
          href="/feature-requests?source=others_feature_request"
        >
          Feature requests
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener"
          href="/changelog?source=others_changelog"
        >
          Changelog
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://gql.hashnode.com"
        >
          Hashnode APIs
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://podcasters.spotify.com/pod/show/the-commit"
        >
          The Commit Podcast
        </a>
        <h3 className="col-span-2 mt-5 text-base font-medium text-slate-700 dark:text-slate-200">
          Company
        </h3>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          href="/about?source=others_about"
        >
          About
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://status.hashnode.com"
        >
          Service status
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://hashnode.com/blog?source=others_hashnode_blog"
        >
          Official blog
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          href="/media?source=others_press_kit"
        >
          Press kit
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://townhall.hashnode.com"
        >
          Townhall blog
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          target="_Blank"
          rel="noopener noreferrer"
          href="https://hshno.de/careers"
        >
          Careers
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          href="/acknowledgements?source=others_oss_ack"
        >
          OSS ACK
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          href="/support?source=others_support"
        >
          Support
        </a>
        <a
          className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
          href="/headless/referral?source=others_referral"
        >
          Earn $500
        </a>
        <h3 className="col-span-2 mt-5 text-base font-medium text-slate-700 dark:text-slate-200">
          Connect with us
        </h3>
        <div className="col-span-2 flex flex-wrap gap-5 text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
          <a
            className="rounded-full border border-slate-200 p-2 font-medium hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            href="https://twitter.com/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on Twitter"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M15.56 2.428c.275.209.328.601.118.876l-4.137 5.42 5.168 6.798c.659.867.038 2.113-1.05 2.11l-1.947-.006a1.315 1.315 0 0 1-1.04-.515l-3.801-4.96-4.046 5.318a.625.625 0 1 1-.995-.756l4.255-5.594-5.028-6.686c-.651-.867-.033-2.105 1.051-2.104h1.907c.41 0 .797.192 1.045.518l3.696 4.846 3.929-5.148a.625.625 0 0 1 .876-.117ZM6.067 3.604a.064.064 0 0 0-.051-.025H4.108a.058.058 0 0 0-.034.008.07.07 0 0 0-.024.027.07.07 0 0 0-.007.035c0 .007.002.017.014.032l5.31 7.063 4.298 5.607c.012.015.03.025.05.025l1.947.006c.02 0 .03-.005.035-.008a.07.07 0 0 0 .023-.028.07.07 0 0 0 .008-.035c0-.006-.002-.017-.014-.032L6.066 3.604Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className="rounded-full border border-slate-200 p-2 font-medium hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            href="https://linkedin.com/company/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on LinkedIn"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M1.875 5c0-1.726 1.4-3.125 3.125-3.125h10c1.726 0 3.125 1.4 3.125 3.125v10c0 1.726-1.4 3.125-3.125 3.125H5A3.125 3.125 0 0 1 1.875 15V5Zm4.792.625a.958.958 0 1 0 0 1.917.958.958 0 0 0 0-1.917Zm.625 3.542a.625.625 0 0 0-1.25 0v4.166a.625.625 0 1 0 1.25 0V9.167Zm3.333 4.166v-2.5a1.042 1.042 0 0 1 2.083 0v2.5a.625.625 0 1 0 1.25 0v-2.5a2.292 2.292 0 0 0-3.425-1.992.625.625 0 0 0-1.158.326v4.166a.625.625 0 1 0 1.25 0Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className="rounded-full border border-slate-200 p-2 font-medium hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            href="https://instagram.com/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on Instagram"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M7.625 10a2.375 2.375 0 1 1 4.75 0 2.375 2.375 0 0 1-4.75 0Z"
              ></path>
              <path
                fill="currentColor"
                d="M9.139 1.875h1.722c1.143 0 2.04 0 2.76.059.733.06 1.34.184 1.888.463a4.792 4.792 0 0 1 2.094 2.094c.28.549.403 1.155.463 1.888.059.72.059 1.617.059 2.76v1.722c0 1.143 0 2.04-.059 2.76-.06.733-.184 1.34-.463 1.888a4.792 4.792 0 0 1-2.094 2.094c-.549.28-1.155.403-1.888.463-.72.059-1.617.059-2.76.059H9.14c-1.143 0-2.04 0-2.76-.059-.733-.06-1.34-.184-1.888-.463a4.792 4.792 0 0 1-2.094-2.094c-.28-.549-.403-1.155-.463-1.888-.059-.72-.059-1.617-.059-2.76V9.14c0-1.143 0-2.04.059-2.76.06-.733.184-1.34.463-1.888a4.792 4.792 0 0 1 2.094-2.094c.549-.28 1.155-.403 1.888-.463.72-.059 1.617-.059 2.76-.059ZM14.125 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM10 6.375a3.625 3.625 0 1 0 0 7.25 3.625 3.625 0 0 0 0-7.25Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className="rounded-full border border-slate-200 p-2 font-medium hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            href="https://discord.gg/hashnode"
            target="_blank"
            aria-label="Join Hashnode's Discord Community"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M7.556 2.819a.52.52 0 0 1 .544.277l.293.57c.091-.01.196-.02.309-.03.382-.037.877-.074 1.295-.074.42 0 .916.037 1.299.073l.31.032.294-.571a.52.52 0 0 1 .544-.277c1.2.188 2.524.605 3.576 1.11a.52.52 0 0 1 .2.17 14.658 14.658 0 0 1 2.558 9.872.52.52 0 0 1-.205.363 14.155 14.155 0 0 1-4.404 2.207.521.521 0 0 1-.578-.234l-.577-.957a.34.34 0 0 1 .211-.503c.51-.13 1.014-.281 1.51-.445a.52.52 0 1 0-.354-.98c-1.409.466-2.89.825-4.381.825s-2.973-.36-4.382-.825a.52.52 0 1 0-.354.98c.497.164 1.001.316 1.512.445a.34.34 0 0 1 .21.504l-.577.956a.52.52 0 0 1-.578.235 14.157 14.157 0 0 1-4.404-2.207.52.52 0 0 1-.205-.364c-.394-3.87.786-7.35 2.557-9.872a.52.52 0 0 1 .201-.17 13.562 13.562 0 0 1 3.576-1.11ZM5.734 10c0 .926.676 1.68 1.498 1.68.835 0 1.498-.754 1.498-1.68.014-.92-.657-1.68-1.498-1.68-.835 0-1.498.754-1.498 1.68Zm7.038 1.68c-.822 0-1.498-.754-1.498-1.68 0-.926.663-1.68 1.498-1.68.841 0 1.511.76 1.498 1.68 0 .926-.657 1.68-1.498 1.68Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className="rounded-full border border-slate-200 p-2 font-medium hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
            href="https://www.youtube.com/@hashnode"
            target="_blank"
            aria-label="Join Hashnode's YouTube Community"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M1.875 7.292a3.958 3.958 0 0 1 3.958-3.959h8.334a3.958 3.958 0 0 1 3.958 3.959v5.416a3.958 3.958 0 0 1-3.958 3.959H5.833a3.958 3.958 0 0 1-3.958-3.959V7.292Zm7.09.17a.417.417 0 0 0-.632.357v4.362c0 .324.354.524.631.357l3.635-2.18a.417.417 0 0 0 0-.715L8.964 7.462Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <hr className="col-span-2 my-4 h-px w-full bg-slate-200 dark:border-slate-800" />
        <div className="col-span-2 text-sm text-slate-600 dark:text-slate-300">
          <a
            className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
            href="/privacy"
          >
            Privacy
          </a>
          <span className="mx-2 inline-block font-bold opacity-50 ">·</span>
          <a
            className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
            href="/terms"
          >
            Terms
          </a>
          <span className="mx-2 inline-block font-bold opacity-50 ">·</span>
          <span className="inline-block break-words text-slate-500 dark:text-slate-400">
            2024 Hashnode
          </span>
        </div>
      </div>
    </div>
  );
};

interface DraftCardProps {
  draft: SerializeSchema.SerializePost<false>;
}

function DraftCard({ draft }: DraftCardProps) {
  return (
    <div className="flex flex-col gap-3 text-slate-700 dark:text-slate-300">
      <Link
        unstable_viewTransition
        className="font-heading mr-3 line-clamp-1 text-base font-semibold leading-snug"
        to={PAGE_ENDPOINTS.WRITE.ID(draft.id)}
      >
        {draft.title}
      </Link>
      <div className="flex flex-row space-x-2 text-sm font-medium text-slate-600 dark:text-slate-400">
        <p className="text-sm font-normal text-slate-600 dark:text-slate-400">
          Edited {distanceInWordsToNow(draft.createdAt)}
        </p>
        <Link
          unstable_viewTransition
          className="flex flex-row gap-2 text-slate-500 hover:underline"
          to={PAGE_ENDPOINTS.WRITE.ID(draft.id)}
        >
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Continue editing
          </p>
        </Link>
      </div>
    </div>
  );
}
