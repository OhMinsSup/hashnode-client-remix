import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";

export default function TrendingTag() {
  return (
    <div className={styles.root}>
      <a className={styles.image_link} href="#">
        <div className={styles.image_container}>
          <img
            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1644902300094/qI9DIT5tW.png?auto=compress"
            alt=""
          />
        </div>
      </a>
      <div className={styles.content_container}>
        <h3 className={styles.title}>
          <a aria-label="Devops" href="/n/devops">
            Devops
          </a>
        </h3>
        <p className={styles.count}>
          <a aria-label="444 articles" href="/n/devops">
            444 articles
          </a>
        </p>
      </div>
      <div className={styles.btn_follow_container}>
        <button className={styles.btn_follow} aria-label="Follow blog">
          <Icons.V2.FollowTag />
        </button>
      </div>
    </div>
  );
}
