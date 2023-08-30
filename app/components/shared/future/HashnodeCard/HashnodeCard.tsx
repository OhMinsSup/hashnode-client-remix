import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";
import classNames from "classnames";
import { cn } from "~/utils/util";

export default function HashnodeCard() {
  return (
    <div className={styles.root}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <a href="/@PuggosTheDuck?source=feed-profile-clicked">
            <div className={styles.thumbnail_container}>
              <div className="w-full h-full">
                <img
                  alt="Benjamin Topolosky"
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1650680144672/UAeGAFeB6.jpg?w=124&amp;h=124&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
                  decoding="async"
                  data-nimg="fill"
                  className="css-1vfhcql"
                  loading="lazy"
                />
              </div>
            </div>
          </a>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center text-sm gap-1">
              <div className="css-zjik7">
                <a href="/@PuggosTheDuck?source=feed-profile-clicked">
                  <span className={styles.username}>Benjamin Topolosky</span>
                </a>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-1">
              <div className="flex-row items-center justify-start gap-1 hidden sm:flex">
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://bentopolosky.hashnode.dev"
                >
                  <p className={styles.domain}>bentopolosky.hashnode.dev</p>
                </a>
                <p className={styles.dot}>•</p>
              </div>
              <a
                target="_blank"
                rel="noopener"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <p className={styles.date}>Jul 23, 2023</p>
              </a>
            </div>
          </div>
        </div>
        <button type="button" aria-label="Featured on Hashnode">
          <div className={styles.btn_featured} data-state="closed">
            <Icons.V2.CardFeatured className="flex items-center justify-center w-5 h-5" />
            <span className="hidden sm:block">Featured</span>
          </div>
        </button>
      </div>
      <div className="flex flex-col justify-start gap-4 md:gap-5 w-full">
        <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
          <div className="flex flex-col gap-1 ">
            <div>
              <a
                target="_blank"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <h1 className={styles.title}>
                  The SIEMingly Amazing Honeypot 🐝
                </h1>
              </a>
            </div>
            <div className="hidden md:block">
              <a
                target="_blank"
                href="https://bentopolosky.hashnode.dev/the-siemingly-amazing-honeypot"
              >
                <span className={styles.description}>
                  A Sweet Solution to a Sour Problem At the beginning of 2021, I
                  began my journey into the world of technology, more
                  specifically, cyber security. Whenever I ran into a
                  technology-based issue in my home, I always saw Cyber
                  Security/Computer Science had...
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <div className="flex flex-row items-center justify-start gap-2">
            <a
              target="_blank"
              rel="noopener"
              href="/authenticate?next=https://fragland.dev/a-guide-to-table-partitioning-with-postgresql-12"
            >
              <button
                className={cn(styles.btn_action, "group")}
                aria-label="Like reaction"
              >
                <span className="group-hover:text-blue-600">
                  <Icons.V2.Like />
                </span>
                21
              </button>
            </a>
            <a
              target="_blank"
              rel="noopener"
              href="/authenticate?next=https://fragland.dev/a-guide-to-table-partitioning-with-postgresql-12#comments-list"
            >
              <button
                className={cn(styles.btn_action, "group")}
                aria-label="Comment"
              >
                <span className="group-hover:text-blue-600">
                  <Icons.V2.Comment />
                </span>
              </button>
            </a>
            <p className={styles.dot_2}>•</p>
            <p>160 reads</p>
          </div>
          <div className="flex-row items-center flex gap-1">
            <div className="hidden sm:flex gap-2 items-center">
              <a href="/n/postgresql?source=tags_feed_article">
                <div className={styles.tag}>
                  <span className="truncate">PostgreSQL</span>
                </div>
              </a>
              <div
                data-orientation="horizontal"
                role="separator"
                className="h-3 w-px bg-slate-200 dark:bg-slate-800"
              ></div>
            </div>
            <button
              className="bookmark-button group"
              aria-label="Bookmark post"
              data-state="closed"
            >
              <span
                className={classNames(
                  styles.btn_bookmark_text,
                  "group-hover:text-blue-600"
                )}
              >
                <Icons.V2.Bookmark />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

HashnodeCard.V2 = function HashnodeCardV2() {
  return (
    <article className="w-full first-of-type:border-t-0 border-t lg:!border border-slate-200 dark:border-slate-800/80 rounded-none lg:rounded-2xl pt-5 md:pt-8 lg:p-6 lg:pb-5 bg-white dark:bg-slate-950 flex flex-col gap-4 md:gap-5">
      <section className="flex flex-col gap-2 sm:gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-start gap-3">
              <a
                className="css-gmqvo3"
                href="/@0xinhua?source=feed-profile-clicked"
              >
                <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-10 h-10 rounded-full overflow-hidden">
                  <div className="css-sflqu2">
                    <img
                      alt="Kevin Wu"
                      src="https://cdn.hashnode.com/res/hashnode/image/upload/v1691655923579/1Cn2jrJ-m.png?w=124&amp;h=124&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
                      decoding="async"
                      data-nimg="fill"
                      className="css-1vfhcql"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
              <div className="flex flex-col">
                <div className="flex flex-row justify-start items-center text-sm gap-1">
                  <div className="flex gap-2">
                    <a href="/@0xinhua?source=feed-profile-clicked">
                      <span className="font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                        Kevin Wu
                      </span>
                    </a>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-start gap-1">
                  <div className="flex-row items-center justify-start gap-1 hidden sm:flex">
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://aircode.hashnode.dev"
                    >
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                        aircode.hashnode.dev
                      </p>
                    </a>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal hidden sm:block">
                      ·
                    </p>
                  </div>
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">
                      Aug 28, 2023
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-5 w-full">
          <div className="w-full flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6 justify-between">
            <div className="flex flex-col gap-1 ">
              <div>
                <a
                  target="_blank"
                  href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
                >
                  <h1 className="font-heading text-base sm:text-xl font-semibold sm:font-bold  text-slate-700 dark:text-slate-200 hn-break-words cursor-pointer">
                    Building a Blog Subscription and Pusher with AirCode and
                    Resend
                  </h1>
                </a>
              </div>
              <div className="hidden md:block">
                <a
                  target="_blank"
                  href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
                >
                  <span className="text-base hidden font-normal text-slate-500 dark:text-slate-400 hn-break-words cursor-pointer md:line-clamp-2">
                    Introduction Learn how to build subscription and push
                    notification services in Node.js and Next.js, and send your
                    first email using the Resend Node.js SDK on AirCode. Here's
                    what the finished page and email will look like: In this
                    tutorial, I'll gui...
                  </span>
                </a>
              </div>
            </div>
            <div className="w-full rounded-xl md:rounded-lg bg-slate-100 dark:bg-slate-800 relative cursor-pointer md:basis-[180px] md:h-[108px] md:shrink-0">
              <div className="md:hidden">
                <AspectRatio.Root ratio={16 / 9}>
                  <a
                    target="_blank"
                    className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800"
                    href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
                  >
                    <img
                      alt="Building a Blog Subscription and Pusher with AirCode and Resend"
                      src="https://cdn.hashnode.com/res/hashnode/image/upload/v1693217415498/d869e8e1-0cdb-406e-820c-2cf50b549931.png?w=1600&amp;h=840&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp"
                      decoding="async"
                      data-nimg="fill"
                      className="w-full h-full"
                    />
                  </a>
                </AspectRatio.Root>
              </div>
              <div className="hidden md:block w-full h-full">
                <a
                  target="_blank"
                  className="block w-full h-full overflow-hidden rounded-xl md:rounded-lg focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800"
                  href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
                >
                  <img
                    alt="Building a Blog Subscription and Pusher with AirCode and Resend"
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1693217415498/d869e8e1-0cdb-406e-820c-2cf50b549931.png?w=1600&amp;h=840&amp;fit=crop&amp;crop=entropy&amp;auto=compress,format&amp;format=webp"
                    decoding="async"
                    data-nimg="fill"
                    className="w-full h-full"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between text-slate-600 dark:text-slate-300 text-sm">
          <div className="flex flex-row items-center justify-start gap-2">
            <a
              target="_blank"
              rel="noopener"
              href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
            >
              <button
                className="w-fit flex items-center justify-center gap-1.5 rounded-full px-1 py-1.5 font-sans font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-600 bg-transparent group cursor-pointer"
                aria-label="Like reaction"
              >
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600">
                  <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                    <path
                      stroke="currentColor"
                      d="M10 17.5c.833 0 8.333-4.166 8.333-10 0-2.916-2.5-4.963-5-5-1.25-.018-2.5.417-3.333 1.667-.833-1.25-2.105-1.666-3.333-1.666-2.5 0-5 2.083-5 5 0 5.833 7.5 9.999 8.333 9.999Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.25"
                    ></path>
                  </svg>
                </span>
                58
              </button>
            </a>
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
                8
              </button>
            </a>
            <span className="hidden sm:block">
              <a
                target="_blank"
                rel="noopener"
                href="https://aircode.hashnode.dev/building-a-blog-subscription-and-pusher-with-aircode-and-resend"
              >
                <div className="w-fit flex justify-start -space-x-2">
                  <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-6 h-6 rounded-full overflow-hidden inline-block ring-2 ring-white dark:ring-slate-950">
                    <img
                      alt="Daniela Passos"
                      src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677354149133/7PiSieMPM.png?w=64&amp;h=64&amp;auto=compress,format&amp;format=webp"
                      decoding="async"
                      data-nimg="fill"
                      className="css-1vfhcql"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center justify-center bg-slate-100 cursor-pointer relative w-6 h-6 rounded-full overflow-hidden inline-block ring-2 ring-white dark:ring-slate-950">
                    <img
                      alt="Roy Ibarra"
                      src="https://cdn.hashnode.com/res/hashnode/image/upload/v1677692121623/bd6e9fd1-28d0-4c58-831f-d2354d34e841.png?w=64&amp;h=64&amp;auto=compress,format&amp;format=webp"
                      decoding="async"
                      data-nimg="fill"
                      className="css-1vfhcql"
                      loading="lazy"
                    />
                  </div>
                </div>
              </a>
            </span>
            <p className="text-slate-400 dark:text-slate-500">·</p>
            <p>243 reads</p>
          </div>
          <div className="flex-row items-center flex gap-1">
            <div className="hidden sm:flex gap-2 items-center">
              <a href="/n/reactjs?source=tags_feed_article">
                <div className="flex justify-start items-center rounded-full px-2 py-1 cursor-pointer text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700 w-min max-w-[126px] truncate text-left">
                  <span className="truncate">React</span>
                </div>
              </a>
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
      </section>
    </article>
  );
};
