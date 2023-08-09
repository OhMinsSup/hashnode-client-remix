import React from "react";

export default function AsideBookmark() {
  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-start w-full gap-3.5 py-5 px-6 ">
      <div className="">
        <h2 className="font-heading text-xl font-semibold dark:text-slate-300 text-slate-700">
          Bookmarks
        </h2>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          <div className="flex flex-col gap-1">
            <h2
              className="line-clamp-2 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              aria-label="Post Title"
              title="Angular Standalone Components"
            >
              Angular Standalone Components
            </h2>
            <div className="flex flex-row font-medium text-sm text-slate-500 dark:text-slate-400 h-6 items-center">
              <p>
                <a
                  href="/@ltemihai"
                  aria-label="Post Author"
                  title="Mihai Oltean"
                >
                  Mihai Oltean
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
              <p>9 min read</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className="line-clamp-2 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              aria-label="Post Title"
              title="The hidden dangers of JSONs: Hunger silenced"
            >
              The hidden dangers of JSONs: Hunger silenced
            </h2>
            <div className="flex flex-row font-medium text-sm text-slate-500 dark:text-slate-400 h-6 items-center">
              <p>
                <a
                  href="/@kriebbels"
                  aria-label="Post Author"
                  title="Kristof Riebbels"
                >
                  Kristof Riebbels
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50 ml-0">
                ·
              </span>
              <p>8 min read</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <a
          href="/bookmarks"
          className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-sm py-2.5 px-5 w-full items-center justify-center menu-bookmark"
        >
          See all bookmarks
        </a>
      </div>
    </div>
  );
}
