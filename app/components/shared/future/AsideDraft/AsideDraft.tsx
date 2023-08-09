import React from "react";

export default function AsideDraft() {
  return (
    <div className="border border-slate-200 dark:border-slate-800/80 rounded-2xl flex flex-col justify-start w-full gap-3.5 py-5 px-6 ">
      <div className="flex justify-between gap-2 items-center">
        <h2 className="font-heading text-xl font-semibold dark:text-slate-300 text-slate-700">
          Drafts (24)
        </h2>
        <a
          href="/drafts"
          className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-xs py-1.5 px-4"
        >
          See all
        </a>
      </div>
      <div>
        <div className="dark:text-slate-300 text-slate-700 flex flex-col gap-3">
          <a
            href="/draft/64397e9bdb127c000fb89af9"
            className="text-base font-semibold leading-snug font-heading line-clamp-1 mr-3"
          >
            No title
          </a>
          <div className="flex flex-row font-medium text-sm text-slate-600 dark:text-slate-400">
            <p className="font-normal text-sm text-slate-600 dark:text-slate-400">
              Edited Apr 15
            </p>
            <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
            <a
              href="/draft/64397e9bdb127c000fb89af9"
              className="flex flex-row gap-2 hover:underline text-slate-500"
            >
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Continue editing
              </p>
              <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
                <path
                  stroke="currentColor"
                  d="M12.77 3.897 7.587 9.078c-.344.344-.515.516-.659.708-.128.17-.238.353-.331.545-.105.216-.178.448-.324.911l-.763 2.413 2.413-.762c.463-.147.695-.22.911-.324.192-.093.375-.204.545-.332.193-.143.364-.315.708-.659l5.181-5.18m-2.5-2.5.981-.981c.34-.341.511-.512.695-.603a1.25 1.25 0 0 1 1.11 0c.184.091.354.262.695.603.34.34.511.51.602.695.174.35.174.76 0 1.11-.09.183-.261.354-.602.694l-.98.981m-2.5-2.5 2.5 2.5M16.666 17.5H3.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.25"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
