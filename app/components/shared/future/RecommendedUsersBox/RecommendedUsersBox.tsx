import React from "react";
import { Icons } from "../../Icons";
import RecommendedUser from "../RecommendedUser/RecommendedUser";
import styles from "./styles.module.css";

export default function RecommendedUsersBox() {
  return (
    <div className={styles.root}>
      <div className={styles.title_area}>
        <div>Recommended Users for you</div>
        <a href="/explore/tags">
          <span className={styles.title_link_container}>
            <span>Browse more users</span>
            <Icons.V2.MoveRight />
          </span>
        </a>
      </div>
      <div className={styles.content_area}>
        {/* Item */}
        <RecommendedUser />
        <RecommendedUser />
        <RecommendedUser />
        <RecommendedUser />
      </div>
    </div>
  );
}
