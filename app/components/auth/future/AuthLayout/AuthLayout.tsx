import React from "react";
import styles from "./styles.module.css";
import { AuthContent } from "../AuthContent";

interface AuthLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({ children, header }: AuthLayoutProps) {
  return (
    <div className={styles.root}>
      <section>
        <header className={styles.header}>{header}</header>
        <div className={styles.content}>
          <AuthContent>{children}</AuthContent>
        </div>
      </section>
    </div>
  );
}
