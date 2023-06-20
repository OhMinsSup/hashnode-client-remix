import React from "react";
import styles from "./styles.module.css";
import { MainHeader } from "../MainHeader";

type LayoutType = "main";

interface MainLayoutProps {
  children: React.ReactNode;
  layout?: LayoutType;
}

export default function MainLayout({
  children,
  layout = "main",
}: MainLayoutProps) {
  return (
    <div>
      {/* react-joyride */}
      <div className={styles.root}>
        {layout === "main" && <MainHeader />}
        <main className={styles.main}>{children}</main>
        <aside className={styles.aside}>Aside</aside>
      </div>
      {/* google one tap */}
    </div>
  );
}
