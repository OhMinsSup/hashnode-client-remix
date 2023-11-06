import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { useFetcher } from "@remix-run/react";
import { REMIX_ACTIONS_KEY } from "~/constants/constant";

export default function Logout() {
  const fetcher = useFetcher();

  const onLogout = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      fetcher.submit(null, {
        method: "POST",
        action: REMIX_ACTIONS_KEY.LOGOUT,
      });
    },
    [fetcher]
  );

  return (
    <div className={styles.item} onClick={onLogout}>
      <div className={styles.item_container}>
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden text-orange-600 sm:block">
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                stroke="currentColor"
                d="M13.333 14.167 17.5 10m0 0-4.167-4.167M17.5 10h-10m0-7.5h-1c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5h1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
              ></path>
            </svg>
          </div>
          <div className="text-orange-600 sm:hidden">
            <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
              <path
                stroke="currentColor"
                d="m16 17 5-5m0 0-5-5m5 5H9m0-9H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 21 6.12 21 7.8 21H9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>
          <span title="Log out" className={styles.text}>
            Log out
          </span>
        </div>
      </div>
    </div>
  );
}
