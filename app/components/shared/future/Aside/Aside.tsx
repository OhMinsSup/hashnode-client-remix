import React from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import AsideDraft from './AsideDraft';
import AsideFooter from './AsideFooter';
import AsideTrendingArticles from './AsideTrendingArticles';

interface AsideProps {
  draftTotal?: number;
  drafts?: SerializeSchema.SerializePost<false>[];
  trendingArticlesTotal?: number;
  trendingArticles?: SerializeSchema.SerializePost<false>[];
}

export default function Aside({
  drafts,
  draftTotal = 0,
  trendingArticles,
  trendingArticlesTotal = 0,
}: AsideProps) {
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
          <AsideDraft draftTotal={draftTotal} drafts={drafts} />
        ) : null}
        <AsideTrendingArticles
          trendingArticlesTotal={trendingArticlesTotal}
          trendingArticles={trendingArticles}
        />
        <Aside.Container title="Top commenters this week">adsa</Aside.Container>
        <Aside.Container title="Bookmarks">adsa</Aside.Container>
        <Aside.Container title="Team Blogs">adsa</Aside.Container>
        <AsideFooter />
      </div>
    </div>
  );
}

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
    <div className="flex w-full flex-col justify-start gap-3.5 rounded-2xl border border-slate-200 px-6 py-5 dark:border-slate-800/80 ">
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
