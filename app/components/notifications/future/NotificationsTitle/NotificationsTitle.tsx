import React from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";

export default function NotificationsTitle() {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Notifications</h3>
      <button className={styles.btn_all_check}>
        <Icons.V2.NotificationAllCheck />
        <span className="ml-1 sm:ml-2">Mark all as read</span>
      </button>
    </div>
  );
}
