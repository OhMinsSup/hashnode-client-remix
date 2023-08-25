import React from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { RecommendedUsersBox } from "~/components/shared/future/RecommendedUsersBox";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";

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
      <ReachedEnd />
    </div>
  );
}
