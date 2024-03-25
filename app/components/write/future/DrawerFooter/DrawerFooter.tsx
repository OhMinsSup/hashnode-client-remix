import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/utils";

export default function DrawerFooter() {
  return (
    <div className={styles.root}>
      <a
        target="_blank"
        className={styles.link_code_of_content}
        data-state="closed"
        href="https://hashnode.com/code-of-conduct"
        rel="noreferrer"
      >
        <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
          <path
            stroke="currentColor"
            d="M11.369 12h4M8.63 12h.01m-.01 4h.01m2.728 0h4m-.15-11H16a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h.756M11 7h2a2 2 0 1 0 0-4h-2a2 2 0 1 0 0 4Z"
            strokeLinecap="round"
            strokeWidth="1.5"
          ></path>
        </svg>
      </a>
      <div className={styles.footer_code_of_content}>
        <a
          target="_blank"
          className={cn(styles.link_code_of_content, styles.link)}
          data-state="closed"
          href="https://hashnode.com/code-of-conduct"
          rel="noreferrer"
        >
          <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
            <path
              stroke="currentColor"
              d="M11.369 12h4M8.63 12h.01m-.01 4h.01m2.728 0h4m-.15-11H16a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h.756M11 7h2a2 2 0 1 0 0-4h-2a2 2 0 1 0 0 4Z"
              strokeLinecap="round"
              strokeWidth="1.5"
            ></path>
          </svg>
        </a>
      </div>
      <div className={styles.footer_action_area}>
        <button
          className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-sm py-2.5 px-5 css-4iohd7"
          type="button"
        >
          Submit for review
        </button>
        <button
          className="rounded-full flex bg-blue-600 hover:bg-blue-500 text-white border-transparent focus:dark:bg-blue-600 focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:focus:ring-offset-slate-800 disabled:bg-blue-200 disabled:cursor-not-allowed disabled:dark:bg-blue-900 disabled:dark:text-slate-400 text-sm py-2.5 px-5 css-oy98sl"
          type="submit"
          data-state="closed"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
