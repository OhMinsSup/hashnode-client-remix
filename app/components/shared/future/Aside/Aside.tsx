import React from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import AsideBookmarks from './AsideBookmarks';
import AsideDraft from './AsideDraft';
import AsideFooter from './AsideFooter';
import AsideTrendingArticles from './AsideTrendingArticles';

export default function Aside() {
  return (
    <div className="hidden xl:block">
      <div
        className="mb-5 flex flex-col gap-6 sm:w-[340px] xl:mt-8"
        id="main-aside"
      >
        <Aside.Content />
      </div>
    </div>
  );
}

Aside.displayName = 'Aside';

Aside.Content = function Item() {
  return (
    <>
      <Aside.Container
        title="Changelog"
        subheading={
          <Button variant="ghost" type="button" size="icon">
            <Icons.close />
          </Button>
        }
      >
        <Aside.Changelog />
      </Aside.Container>
      <AsideDraft />
      <AsideTrendingArticles />
      <Aside.Container title="Top commenters this week">adsa</Aside.Container>
      <AsideBookmarks />
      <AsideFooter />
    </>
  );
};

interface ContainerProps {
  title: string;
  subheading?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

Aside.Container = function Item({
  children,
  title,
  subheading,
  footer,
}: ContainerProps) {
  return (
    <div className="flex w-full flex-col justify-start gap-3.5 rounded-2xl border border-slate-200 px-6 py-5 dark:border-slate-800/80">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h2>
        {subheading}
      </div>
      <div>{children}</div>
      {footer}
    </div>
  );
};

Aside.Changelog = function Item() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <a
          aria-label="Introducing AI Sidekick — Your research assistant for writing at Hashnode!"
          className="max-h-[153px] overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800/80"
          target="_blank"
          rel="noopener"
          href="/changelog/introducing-ai-sidekick-writing-assistant?source=changelog_widget"
        >
          <img
            alt="Introducing AI Sidekick — Your research assistant for writing at Hashnode!"
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1717070268089/vfaEFDfYb.png?auto=format"
            width="30"
            height="30"
            decoding="async"
            data-nimg="1"
            className="block w-full"
            loading="lazy"
          />
        </a>
        <h3 className="dark:hover:bg-transparent) font-semibold leading-snug tracking-normal text-slate-700 hover:text-slate-900 dark:text-white">
          <a
            aria-label="Introducing AI Sidekick — Your research assistant for writing at Hashnode!"
            target="_blank"
            rel="noopener"
            href="/changelog/introducing-ai-sidekick-writing-assistant?source=changelog_widget"
          >
            Introducing AI Sidekick — Your research assistant for writing at
            Hashnode!
          </a>
        </h3>
        <div className="flex flex-row items-center gap-2">
          <time className="font-normal leading-none text-slate-600 dark:text-slate-400">
            May 30, 2024
          </time>
          <span className="block font-bold text-slate-500">·</span>
          <div className="flex w-fit items-center justify-center gap-0.5 rounded-[12px] border-green-200 bg-green-100 px-2 py-0.5 font-sans text-sm font-medium text-green-700 dark:border-green-900 dark:border-opacity-30 dark:bg-green-950/70 dark:text-green-200">
            <span className="capitalize">new</span>
          </div>
        </div>
      </div>
    </div>
  );
};
