import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";

export default function AsideDraft() {
  return (
    <div className={styles.root}>
      <div className="flex justify-between gap-2 items-center">
        <h2 className={styles.title}>Drafts (24)</h2>
        <a href="/drafts" className={styles.btn_see_all}>
          See all
        </a>
      </div>
      <div>
        <div className={styles.item}>
          <a
            href="/draft/64397e9bdb127c000fb89af9"
            className={styles.item_title}
          >
            No title
          </a>
          <div className={styles.item_desc}>
            <p className={styles.item_desc_date}>Edited Apr 15</p>
            <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
            <a
              href="/draft/64397e9bdb127c000fb89af9"
              className={styles.item_btn_edit}
            >
              <p className={styles.item_btn_edit_text}>Continue editing</p>
              <Icons.V2.DraftEditIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
