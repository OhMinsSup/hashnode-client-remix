import React from "react";
import styles from "./styles.module.css";
import { cn } from "~/services/libs";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <body className={cn(styles.root)}>{children}</body>;
}
