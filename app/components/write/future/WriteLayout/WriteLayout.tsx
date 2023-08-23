import React from "react";
import styles from "./styles.module.css";

interface WriteLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function WriteLayout({ children, sidebar }: WriteLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>{sidebar}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
