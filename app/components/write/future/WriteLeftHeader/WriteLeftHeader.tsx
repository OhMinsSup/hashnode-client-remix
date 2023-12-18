import React, { useCallback } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./styles.module.css";
import { useWriteContext } from "~/context/useWriteContext";

export default function WriteLeftHeader() {
  const { setSideOpen, isSideOpen } = useWriteContext();

  const onClickSideMenu = useCallback(() => {
    setSideOpen();
  }, [setSideOpen]);

  if (isSideOpen) {
    return null;
  }

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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_4792_34477"
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="18"
                height="18"
                style={{ maskType: "alpha" }}
              >
                <rect
                  width="16.25"
                  height="16.25"
                  rx="3.12"
                  transform="matrix(-1 0 0 1 18.125 1.875)"
                  fill="#D9D9D9"
                ></rect>
              </mask>
              <g mask="url(#mask0_4792_34477)">
                <path
                  d="M17.5 15V5C17.5 3.61929 16.3807 2.5 15 2.5H12.0833H5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15Z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M7.91406 2.5V17.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10.4141 9.9974H14.9974M14.9974 9.9974L12.914 12.0807M14.9974 9.9974L12.914 7.91406"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
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
