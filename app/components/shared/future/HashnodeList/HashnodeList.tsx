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
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      {recommendedUsers && <RecommendedUsersBox />}
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      {trendingTags}
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <ReachedEnd />
    </div>
  );
}
