import React from "react";
import styles from "./styles.module.css";

interface HashnodeContainerProps {
  children: React.ReactNode;
}

export default function HashnodeContainer({
  children,
}: HashnodeContainerProps) {
  return <div className={styles.root}>{children}</div>;
}
