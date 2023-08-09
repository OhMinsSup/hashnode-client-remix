import React from "react";

export default function AsideTrendingArticle() {
  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-start w-full gap-3.5 py-5 px-6 ">
      <div className="flex justify-between gap-2 items-center">
        <h2 className="font-heading text-xl font-semibold dark:text-slate-300 text-slate-700">
          Trending Articles
        </h2>
        <button
          className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-xs py-1.5 px-4 flex items-center gap-1.5"
          type="button"
          id="radix-:r12:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          <span>1 week</span>
          <span>
            <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
              <path
                stroke="currentColor"
                d="m4 7 4 4 4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          <div className="flex flex-col gap-1">
            <h2
              className="line-clamp-2 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              aria-label="Post Title"
              title="Implementing 2FA in NestJS: A Step-by-Step Guide for Better Security"
            >
              Implementing 2FA in NestJS: A Step-by-Step Guide for Better
              Security
            </h2>
            <div className="flex flex-row font-medium text-sm text-slate-500 dark:text-slate-400 h-6 items-center">
              <p>
                <a
                  href="/@bytescrum"
                  aria-label="Post Author"
                  title="ByteScrum Technologies"
                >
                  ByteScrum Technolo...
                </a>
                <a
                  className="group css-i7ftw6"
                  href="/pro?source=proBadge"
                  data-state="closed"
                >
                  <div className="css-15v8co2">Pro</div>
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ml-0">
                ·
              </span>
              <p>54 reads</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className="line-clamp-2 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              aria-label="Post Title"
              title="Unveiling the Single-Threaded Nature of JavaScript and Node.js: The Waiter and the Restaurant Analogy"
            >
              Unveiling the Single-Threaded Nature of JavaScript and Node.js:
              The Waiter and the Restaurant Analogy
            </h2>
            <div className="flex flex-row font-medium text-sm text-slate-500 dark:text-slate-400 h-6 items-center">
              <p>
                <a
                  href="/@godnik"
                  aria-label="Post Author"
                  title="Nikhil Mishra"
                >
                  Nikhil Mishra
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
              <p>177 reads</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className="line-clamp-2 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              aria-label="Post Title"
              title="How to Generate Dynamic Sitemap in Next Js&nbsp;Using&nbsp;Node&nbsp;Js."
            >
              How to Generate Dynamic Sitemap in Next
              Js&nbsp;Using&nbsp;Node&nbsp;Js.
            </h2>
            <div className="flex flex-row font-medium text-sm text-slate-500 dark:text-slate-400 h-6 items-center">
              <p>
                <a
                  href="/@bytescrum"
                  aria-label="Post Author"
                  title="ByteScrum Technologies"
                >
                  ByteScrum Technolo...
                </a>
                <a
                  className="group css-i7ftw6"
                  href="/pro?source=proBadge"
                  data-state="closed"
                >
                  <div className="css-15v8co2">Pro</div>
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ml-0">
                ·
              </span>
              <p>69 reads</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <button className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-sm py-2.5 px-5 w-full items-center justify-center">
          <span className="flex flex-row gap-2 w-full items-center justify-center text-sm font-medium">
            <span>See more</span>
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="m5 8 5 5 5-5"
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
}
