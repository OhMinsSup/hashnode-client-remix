import React from "react";

export default function AsideChangelog() {
  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-start w-full gap-3.5 py-5 px-6 ">
      <div className="flex justify-between gap-2 items-center">
        <h2 className="font-heading text-xl font-semibold dark:text-slate-300 text-slate-700">
          Changelog
        </h2>
        <button className="flex items-center justify-center transition-colors duration-100 text-slate-600 dark:text-slate-300 focus:outline-none border border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 disabled:text-slate-300 disabled:dark:text-slate-800 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:cursor-not-allowed rounded-full p-1.5 flex items-center">
          <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
            <path
              stroke="currentColor"
              d="M5 15 15 5M5 5l10 10"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
            ></path>
          </svg>
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <a
            href="/changelog/july-2023?source=changelog_widget"
            aria-label="A new dawn on Hashnode: Redesigned feed, Advanced post editing, AI-enhanced social sharing, and more!"
            className="rounded-lg overflow-hidden max-h-[153px] border border-slate-200 dark:border-slate-800/80"
            target="_blank"
            rel="noopener"
          >
            <img
              alt="A new dawn on Hashnode: Redesigned feed, Advanced post editing, AI-enhanced social sharing, and more!"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1690444155664/PaNdbThnD.png?auto=format"
              width="30"
              height="30"
              decoding="async"
              data-nimg="1"
              className="css-1082qq3"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </a>
          <h3 className="font-semibold tracking-normal leading-snug text-slate-700 hover:text-slate-900 dark:text-white dark:hover:bg-transparent)">
            <a
              href="/changelog/july-2023?source=changelog_widget"
              aria-label="A new dawn on Hashnode: Redesigned feed, Advanced post editing, AI-enhanced social sharing, and more!"
              target="_blank"
              rel="noopener"
            >
              A new dawn on Hashnode: Redesigned feed, Advanced post editing,
              AI-enhanced social sharing, and more!
            </a>
          </h3>
          <div className="flex flex-row items-center gap-2 ">
            <time className="font-normal leading-none text-slate-600 dark:text-slate-400">
              Jul 27, 2023
            </time>
            <span className="block font-bold text-slate-500">·</span>
            <div className="w-fit flex items-center justify-center gap-0.5 rounded-full px-2 py-0.5 font-sans font-medium text-sm text-green-700 bg-green-100 dark:bg-green-700/25 dark:text-green-200">
              <span className="capitalize">new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
