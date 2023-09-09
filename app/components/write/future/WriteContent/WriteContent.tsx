import React from "react";
import styles from "./styles.module.css";
import { TipTapEditor } from "~/components/shared/future/Tiptap";

interface WriteConrentProps {
  header?: React.ReactNode;
}

export default function WriteConrent({ header }: WriteConrentProps) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {header}
        <div className={styles.content}>
          <TipTapEditor />
        </div>
      </div>
    </div>
  );
}
