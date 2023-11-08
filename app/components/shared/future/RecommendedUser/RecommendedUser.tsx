import React from "react";
import styles from "./styles.module.css";
import { Icons } from "../../Icons";
import { ASSET_URL } from "~/constants/constant";

export default function RecommendedUser() {
  return (
    <div className={styles.root}>
      <a className={styles.image_link} href="#">
        <div className="w-full h-full">
          <div className={styles.image_container}>
            <img src={ASSET_URL.DEFAULT_AVATAR} alt="" />
          </div>
        </div>
      </a>
      <div className={styles.content_container}>
        <h3 className={styles.title}>
          <a aria-label="Random Thoughts" href="/n/devops">
            Random Thoughts
          </a>
        </h3>
        <p className={styles.count}>
          <a aria-label="hameteman.com" href="/n/devops">
            hameteman.com
          </a>
        </p>
      </div>
      <div className={styles.btn_follow_container}>
        <button className={styles.btn_follow} aria-label="Follow user">
          <Icons.V2.FollowUser />
        </button>
      </div>
    </div>
  );
}
