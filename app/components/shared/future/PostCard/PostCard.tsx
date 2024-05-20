import { Link } from '@remix-run/react';

import { Icons } from '~/components/icons';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

export default function PostCard() {
  return (
    <article className="flex w-full flex-col gap-4 rounded-none border-t border-slate-200 bg-white pt-5 first-of-type:border-t-0 dark:border-slate-800/80 dark:bg-slate-950 md:gap-5 md:pt-8 lg:rounded-2xl lg:!border lg:p-6 lg:pb-5">
      <section className="flex flex-col gap-2 sm:gap-4">
        <PostCard.Header />
        <PostCard.Body />
      </section>
      <section className="flex flex-col gap-5">
        <PostCard.Footer />
      </section>
    </article>
  );
}

PostCard.Header = function Item() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <Link to={'/'}>
            <Avatar className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-slate-100 hover:opacity-80">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-start gap-1 text-sm">
              <div className="flex gap-2">
                <a href="/@bytescrum?source=feed-profile-clicked">
                  <span className="cursor-pointer font-semibold text-slate-700 dark:text-slate-200">
                    ByteScrum Technologies
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-1">
              <div className="hidden flex-row items-center justify-start gap-1 sm:flex">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://blog.bytescrum.com"
                >
                  <p className="hidden text-sm font-normal text-slate-500 dark:text-slate-400 sm:block">
                    blog.bytescrum.com
                  </p>
                </a>
                <p className="hidden text-sm font-normal text-slate-500 dark:text-slate-400 sm:block">
                  -
                </p>
              </div>
              <a
                target="_blank"
                rel="noopener"
                href="/authenticate?next=https://blog.bytescrum.com/mastering-python-coding-advanced-techniques-and-best-practices"
              >
                <p className="text-sm font-normal text-slate-500 dark:text-slate-400">
                  8 hours ago
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.Body = function Item() {
  return (
    <div className="flex w-full flex-col gap-4 md:gap-5">
      <div className="flex w-full flex-col justify-between gap-3 sm:gap-4 md:flex-row md:gap-6">
        <div className="flex flex-col gap-1">
          <div>
            <a
              target="_blank"
              href="/authenticate?next=https://blog.bytescrum.com/mastering-python-coding-advanced-techniques-and-best-practices"
            >
              <h1 className="font-heading hn-break-words cursor-pointer text-base font-semibold  text-slate-700 dark:text-slate-200 sm:text-xl sm:font-bold">
                Mastering Python Coding: Advanced Techniques and Best Practices
              </h1>
            </a>
          </div>
          <div className="hidden md:block">
            <a
              target="_blank"
              href="/authenticate?next=https://blog.bytescrum.com/mastering-python-coding-advanced-techniques-and-best-practices"
            >
              <span className="hn-break-words hidden cursor-pointer text-base font-normal text-slate-500 dark:text-slate-400 md:line-clamp-2">
                {`Introduction Python's flexibility and readability make it a
                popular choice for developers. However, mastering Python coding
                requires more than just knowing the basics. In this
                comprehensive guide, we'll dive into advanced techniques and
                best practice...`}
              </span>
            </a>
          </div>
        </div>
        <div className="relative w-full cursor-pointer rounded-xl bg-gray-100 dark:bg-gray-900 md:h-[108px] md:shrink-0 md:basis-[180px] md:rounded-lg">
          <div className="md:hidden">
            <AspectRatio ratio={16 / 9}>
              <a
                target="_blank"
                className="block h-full w-full overflow-hidden rounded-xl focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800 md:rounded-lg"
                href="/authenticate?next=https://blog.bytescrum.com/mastering-python-coding-advanced-techniques-and-best-practices"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1716202977190/649d35e8-5903-4e21-b966-4976f29a9ead.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="Mastering Python Coding: Advanced Techniques and Best Practices"
                />
              </a>
            </AspectRatio>
          </div>
          <div className="hidden h-full w-full md:block">
            <AspectRatio ratio={16 / 9}>
              <a
                target="_blank"
                href="/authenticate?next=https://blog.bytescrum.com/mastering-python-coding-advanced-techniques-and-best-practices"
                className="block h-full w-full overflow-hidden rounded-xl focus:outline-none focus:ring focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white focus:dark:ring-offset-slate-800 md:rounded-lg"
              >
                <img
                  className="h-full w-full object-cover"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1716202977190/649d35e8-5903-4e21-b966-4976f29a9ead.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp"
                  alt="Mastering Python Coding: Advanced Techniques and Best Practices"
                />
              </a>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.Footer = function Item() {
  return (
    <div className="flex flex-row items-center justify-between text-sm text-slate-600 dark:text-slate-300">
      <div className="flex flex-row items-center justify-start gap-2">
        <a href="/discussions/post/664b00c7093daf8eb7765163?source=discuss_feed_card_button">
          <div className="group flex items-center gap-2 font-medium">
            <Icons.messagesSquare className="size-4" />
            <span>Discuss</span>
          </div>
        </a>
        <p className="font-bold text-slate-400 dark:text-slate-500">·</p>
        <p>80 likes</p>
        <p className="font-bold text-slate-400 dark:text-slate-500">·</p>
        <p>32 reads</p>
      </div>
      <div className="flex flex-row items-center gap-1">
        <div className="hidden items-center gap-2 sm:flex">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://blog.bytescrum.com/series/python-series"
          >
            <Badge className="flex max-w-[220px] cursor-pointer items-center justify-start truncate rounded-full">
              <span className="truncate">Python</span>
            </Badge>
          </a>
          <a href="/n/python?source=tags_feed_article">
            <Badge
              variant="secondary"
              className="flex w-min max-w-[126px] cursor-pointer items-center justify-start truncate rounded-full"
            >
              <span className="truncate">Python</span>
            </Badge>
          </a>
          <div
            data-orientation="horizontal"
            role="separator"
            className="h-3 w-px bg-slate-200 dark:bg-slate-800"
          ></div>
        </div>
        <Button type="button" size="sm" variant="ghost">
          <Icons.bookmark className="size-4" />
        </Button>
      </div>
    </div>
  );
};
