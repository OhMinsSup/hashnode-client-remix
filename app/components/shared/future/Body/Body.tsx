import React from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <body className={classNames(styles.root)}>{children}</body>;
}
