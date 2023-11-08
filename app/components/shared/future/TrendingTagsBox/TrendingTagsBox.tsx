import React from "react";
import { Icons } from "../../Icons";
import TrendingTag from "../TrendingTag/TrendingTag";
import styles from "./styles.module.css";

export default function TrendingTagsBox() {
  return (
    <div className={styles.root}>
      <div className={styles.title_area}>
        <div>Trending tags this week</div>
        <a href="/explore/tags">
          <span className={styles.title_link_container}>
            <span>Browse more tags</span>
            <Icons.V2.MoveRight />
          </span>
        </a>
      </div>
      <div className={styles.content_area}>
        {/* Item */}
        <TrendingTag />
        <TrendingTag />
        <TrendingTag />
        <TrendingTag />
      </div>
    </div>
  );
}
