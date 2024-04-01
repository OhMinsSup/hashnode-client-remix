import React from "react";
import styles from "./styles.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hiddenHeader?: boolean;
  hiddenFooter?: boolean;
}

export default function MainLayout({
  children,
  footer,
  header,
  hiddenHeader,
  hiddenFooter,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {hiddenHeader ? null : (
        <header className={styles.header}>{header}</header>
      )}
      <main className={styles.main}>{children}</main>
      {hiddenFooter ? null : <nav className={styles.nav}>{footer}</nav>}
    </div>
  );
}
