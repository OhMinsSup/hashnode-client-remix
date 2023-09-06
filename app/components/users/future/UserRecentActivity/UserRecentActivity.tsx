import React from "react";
import styles from "./styles.module.css";
import { UserRecentActivityCard } from "../UserRecentActivityCard";

export default function UserRecentActivity() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>Recent Activity</h3>
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard />
        <UserRecentActivityCard.More />
      </div>
    </div>
  );
}
