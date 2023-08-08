import React from "react";
import styles from "./styles.module.css";
import { AsideChangelog } from "~/components/shared/future/AsideChangelog";
import { AsideDraft } from "~/components/shared/future/AsideDraft";
import { AsideTrendingArticle } from "~/components/shared/future/AsideTrendingArticle";
import { AsideBookmark } from "~/components/shared/future/AsideBookmark";
import { AsideFooter } from "~/components/shared/future/AsideFooter";

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
