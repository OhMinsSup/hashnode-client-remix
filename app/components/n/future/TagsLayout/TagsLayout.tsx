import React from "react";
import styles from "./styles.module.css";

interface TagsLayoutProps {
  children: React.ReactNode;
}

export default function TagsLayout({ children }: TagsLayoutProps) {
  return <div className={styles.root}>{children}</div>;
}
