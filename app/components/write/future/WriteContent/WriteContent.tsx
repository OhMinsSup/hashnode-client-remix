import React from "react";
import styles from "./styles.module.css";
import { TipTapEditor } from "~/components/shared/future/Tiptap";

export default function WriteConrent() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.content}>
          <TipTapEditor />
        </div>
      </div>
    </div>
  );
}
