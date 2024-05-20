import React from 'react';

export default function Aside() {
  return (
    <div className="hidden xl:block">
      <div className="mb-5 flex flex-col gap-6 sm:w-[340px] xl:mt-8">
        <Aside.Container title="Changelog">adsa</Aside.Container>
        <Aside.Container title="Drafts (32)">adsa</Aside.Container>
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
  children: React.ReactNode;
}

Aside.Container = function Item({ children, title }: ContainerProps) {
  return (
    <div className="flex w-full flex-col justify-start gap-3.5 rounded-2xl border border-slate-200 px-6 py-5 dark:border-slate-800/80 ">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-semibold text-slate-700 dark:text-slate-300">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
};
