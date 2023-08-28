import React from "react";
import styles from "./styles.module.css";

interface UsersLayoutProps {
  children: React.ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <main
      itemScope
      itemType="https://schema.org/ProfilePage"
      itemProp="mainEntity"
      className={styles.root}
    >
      {children}
    </main>
  );
}
