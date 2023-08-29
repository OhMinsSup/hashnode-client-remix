import React from "react";
import styles from "./styles.module.css";

interface SearchLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export default function SearchLayout({ children, header }: SearchLayoutProps) {
  return (
    <>
      {header}
      <main className={styles.root}>
        <div className={styles.container}>
          <div className={styles.wrapper}>{children}</div>
        </div>
      </main>
    </>
  );
}
