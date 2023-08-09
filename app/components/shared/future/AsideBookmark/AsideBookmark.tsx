import React from "react";
import styles from "./styles.module.css";

export default function AsideBookmark() {
  return (
    <div className={styles.root}>
      <div>
        <h2 className={styles.title}>Bookmarks</h2>
      </div>
      <div>
        <div className="flex flex-col gap-5 mb-1.5">
          <div className="flex flex-col gap-1">
            <h2
              className={styles.item_title}
              aria-label="Post Title"
              title="Angular Standalone Components"
            >
              Angular Standalone Components
            </h2>
            <div className={styles.item_desc}>
              <p>
                <a
                  href="/@ltemihai"
                  aria-label="Post Author"
                  title="Mihai Oltean"
                >
                  Mihai Oltean
                </a>
              </p>
              <span className="inline-block mx-2 font-bold opacity-50">·</span>
              <p>9 min read</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2
              className={styles.item_title}
              aria-label="Post Title"
              title="The hidden dangers of JSONs: Hunger silenced"
            >
              The hidden dangers of JSONs: Hunger silenced
            </h2>
            <div className={styles.item_desc}>
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
        <a href="/bookmarks" className={styles.btn_see_all}>
          See all bookmarks
        </a>
      </div>
    </div>
  );
}
