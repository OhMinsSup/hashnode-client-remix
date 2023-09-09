import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { WriteAddCover } from "../WriteAddCover";

export default function WriteHead() {
  return (
    <div>
      <div className={styles.header}>
        <WriteAddCover />
        <button type="button" className={styles.btn_subtitle}>
          <svg className="css-9xgk1k" fill="none" viewBox="0 0 18 18">
            <path
              d="M11.25 11.953h-9m1.2-2.906h11.1c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.082-.16.082-.37.082-.79v-.6c0-.42 0-.63-.082-.79a.75.75 0 0 0-.327-.328c-.16-.082-.371-.082-.791-.082H3.45c-.42 0-.63 0-.79.082a.75.75 0 0 0-.328.327c-.082.16-.082.37-.082.79v.6c0 .42 0 .63.082.791a.75.75 0 0 0 .328.328c.16.082.37.082.79.082Z"
              stroke="stroke-current"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span>Add Subtitle</span>
        </button>
      </div>
      <div className="group relative">
        <textarea
          maxLength={150}
          placeholder="Article Title…"
          id="title-input"
          className={cn("peer", styles.textarea_title, "!h-[50px]")}
        >
          asdsdsdsds
        </textarea>
      </div>
      <div className="group relative">
        <textarea
          maxLength={150}
          placeholder="Article Subtitle…"
          id="subtitle-input"
          className={cn("peer", styles.textarea_subtitle, "!h-[33px]")}
        ></textarea>
        <button
          type="button"
          data-title="Remove sub-title"
          className={cn(styles.btn_close)}
        >
          <svg viewBox="0 0 320 512">
            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
