import React from "react";
import styles from "./styles.module.css";
import { AsideChangelog } from "../AsideChangelog";
import { AsideDraft } from "../AsideDraft";
import { AsideTrendingArticle } from "../AsideTrendingArticle";
import { AsideBookmark } from "../AsideBookmark";
import { AsideFooter } from "../AsideFooter";

export default function HashnodeAside() {
  return (
    <aside className={styles.root} style={{ top: 0, position: "relative" }}>
      <section aria-hidden="false"></section>
      <div className={styles.content}>
        <div className={styles.content_container}>
          <AsideChangelog />
          <AsideDraft />
          <AsideTrendingArticle />
          <AsideBookmark />
          <AsideFooter />
        </div>
      </div>
    </aside>
  );
}
