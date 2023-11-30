import React from "react";
import styles from "./styles.module.css";
import { HashnodeCard } from "~/components/shared/future/HashnodeCard";
import { ReachedEnd } from "~/components/shared/future/ReachedEnd";
// import { useLoaderData } from "@remix-run/react";

interface HashnodeListProps {
  recommendedUsers?: React.ReactNode;
  trendingTags?: React.ReactNode;
}

export default function HashnodeList({
  trendingTags,
  recommendedUsers,
}: HashnodeListProps) {
  // const data = useLoaderData();

  // // console.log(data);

  return (
    <div className={styles.root}>
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      <HashnodeCard.V2 />
      {recommendedUsers}
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
