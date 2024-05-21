import React from 'react';
import { Link } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { cn } from '~/services/libs';

export default function Aside() {
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
        <Aside.Container
          title="Drafts (32)"
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
          adsa
        </Aside.Container>
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
