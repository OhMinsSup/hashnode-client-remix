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
      <div className="mb-5 flex flex-col gap-6 sm:w-[340px] xl:mt-8">
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
        <Aside.Container title="Writing Challenges">adsa</Aside.Container>
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
