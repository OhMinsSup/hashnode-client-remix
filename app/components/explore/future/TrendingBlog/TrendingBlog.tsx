import React from "react";
import styles from "./styles.module.css";

export default function TrendingBlog() {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.inner_container}>
          <div className={styles.layout}>
            <div className={styles.rank_title}>#1</div>
            <div className="w-full">
              <div className={styles.title}>123123</div>
              <div className={styles.content}>12312</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
