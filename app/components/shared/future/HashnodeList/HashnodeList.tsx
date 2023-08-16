import React from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "../HashnodeCard";
import { RecommendedUsersBox } from "../RecommendedUsersBox";

interface HashnodeListProps {
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
}

export default function HashnodeList({
  trendingTags,
  recommendedUsers,
}: HashnodeListProps) {
  return (
    <div className={styles.root}>
      <HashnodeCard />
      <HashnodeCard />
      {recommendedUsers && <RecommendedUsersBox />}
      <HashnodeCard />
      <HashnodeCard />
      <HashnodeCard />
      {trendingTags}
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
