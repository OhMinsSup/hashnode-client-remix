import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/services/libs";
import { useWriteContext } from "~/components/write/context/useWriteContext";

interface WriteLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function WriteLayout({ children, sidebar }: WriteLayoutProps) {
  const { isSideOpen } = useWriteContext();
  return (
    <div className={styles.root}>
      <div
        className={cn(
          isSideOpen ? styles.container : styles.container_without_sidebar
        )}
      >
        <div
          className={cn(isSideOpen ? styles.sidebar : styles.sidebar_hidden)}
        >
          {sidebar}
        </div>
        <div
          className={cn(isSideOpen ? styles.content : styles.content_hidden)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
