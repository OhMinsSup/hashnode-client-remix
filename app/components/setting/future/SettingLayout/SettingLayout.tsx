import React from "react";
import styles from "./styles.module.css";

interface SettingLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header: React.ReactNode;
}

export default function SettingLayout({
  children,
  sidebar,
  header,
}: SettingLayoutProps) {
  return (
    <>
      {header}
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.sidebar}>{sidebar}</div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>
  );
}
