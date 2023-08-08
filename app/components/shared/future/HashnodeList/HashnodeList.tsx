import React from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "../HashnodeCard";
import { TrendingTagsBox } from "../TrendingTagsBox";
import { RecommendedUsersBox } from "../RecommendedUsersBox";

export default function HashnodeList() {
  return (
    <div className={styles.root}>
      <HashnodeCard />
      <HashnodeCard />
      <RecommendedUsersBox />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <TrendingTagsBox />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
    </div>
  );
}
