import React from "react";
import styles from "./styles.module.css";

type LayoutType = "main";

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  layout?: LayoutType;
}

export default function MainLayout({
  children,
  footer,
  header,
  sidebar,
  layout = "main",
}: MainLayoutProps) {
  return (
    <div>
      {/* react-joyride */}
      <div className={styles.root}>
        {layout === "main" && header}
        <main className={styles.main}>
          {children}
          {sidebar}
        </main>
        <aside className={styles.aside}></aside>
        {footer}
      </div>
      {/* google one tap */}
    </div>
  );
}
