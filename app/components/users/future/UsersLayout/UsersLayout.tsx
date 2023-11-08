import React from "react";
import styles from "./styles.module.css";

interface UsersLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export default function UsersLayout({ children, header }: UsersLayoutProps) {
  return (
    <div className={styles.container}>
      {header}
      <main className={styles.main}>
        <main
          itemScope
          itemType="https://schema.org/ProfilePage"
          itemProp="mainEntity"
          className={styles.root}
        >
          {children}
        </main>
      </main>
    </div>
  );
}
