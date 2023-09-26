import React, { useCallback } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";

export default function WriteLeftHeader() {
  const { setSideClose, setSideOpen, isSideOpen } = useWriteContext();

  const onClickSideMenu = useCallback(() => {
    if (isSideOpen) {
      setSideClose();
    } else {
      setSideOpen();
    }
  }, [isSideOpen, setSideClose, setSideOpen]);

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            aria-label="Toggle sidebar"
            aria-pressed={isSideOpen ? "true" : "false"}
            className={styles.root}
            onClick={onClickSideMenu}
          >
            <svg fill="none" viewBox="0 0 20 20">
              <path
                d="M6.66667 9.16667H4.58333M6.66667 12.5H4.58333M6.66667 5.83333H4.58333M8.75 2.5V17.5M8.75 2.5H6.5C5.09987 2.5 4.3998 2.5 3.86502 2.77248C3.39462 3.01217 3.01217 3.39462 2.77248 3.86502C2.5 4.3998 2.5 5.09987 2.5 6.5V13.5C2.5 14.9001 2.5 15.6002 2.77248 16.135C3.01217 16.6054 3.39462 16.9878 3.86502 17.2275C4.3998 17.5 5.09987 17.5 6.5 17.5H8.75M8.75 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H8.75"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Content className={styles.tooltip} sideOffset={5}>
          Toggle sidebar
          <Tooltip.Arrow />
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
