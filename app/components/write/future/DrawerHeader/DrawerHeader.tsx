import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";

export default function DrawerHeader() {
  const { close } = useWriteContext();

  const onClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <div className={styles.header}>
      <span>Draft settings</span>
      <button type="button" className={styles.btn_close} onClick={onClose}>
        <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
          <path
            stroke="currentColor"
            d="M6 18 18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          ></path>
        </svg>
      </button>
    </div>
  );
}
