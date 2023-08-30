import React from "react";
import styles from "./style.module.css";

interface NotificationsLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function NotificationsLayout({
  children,
  header,
}: NotificationsLayoutProps) {
  return (
    <>
      {header}
      <main className={styles.root}>
        <div className={styles.container}>{children}</div>
      </main>
    </>
  );
}
