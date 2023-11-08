import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";

export default function AsideChangelog() {
  return (
    <div className={styles.root}>
      <div className="flex justify-between gap-2 items-center">
        <h2 className={styles.title}>Changelog</h2>
        <button type="button" className={styles.btn_changelog_close}>
          <Icons.V2.ChangelogX />
        </button>
      </div>
      <div>
        <div className="flex flex-col gap-3">
          <a
            href="/changelog/july-2023?source=changelog_widget"
            aria-label="A new dawn on Hashnode: Redesigned feed, Advanced post editing, AI-enhanced social sharing, and more!"
            className={styles.changelog_link}
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
              className="w-full"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </a>
          <h3 className={styles.changelog_title}>
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
            <time className={styles.changelog_date}>Jul 27, 2023</time>
            <span className="block font-bold text-slate-500">·</span>
            <div className={styles.changelog_tag}>
              <span className="capitalize">new</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
