import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { useSearchParams } from "@remix-run/react";

interface ExploreLayoutProps {
  title: string;
  description?: string;
  hiddenSelect?: boolean;
  children: React.ReactNode;
}

export default function ExploreLayout({
  children,
  title,
  description,
  hiddenSelect,
}: ExploreLayoutProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchParams({
        ...searchParams,
        category: e.target.value,
      });
    },
    [searchParams, setSearchParams]
  );

  return (
    <>
      <div className={styles.title_area}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {description ? <p className={styles.desc}>{description}</p> : null}
        </div>
        {hiddenSelect ? null : (
          <div className={styles.select_box}>
            <select
              className={styles.select}
              onChange={onChange}
              value={searchParams.get("category") || "all"}
            >
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="year">This year</option>
              <option value="all">All time</option>
            </select>
            <span className={styles.select_icon_container}>
              <Icons.V2.ExploreSelectArrowDown className={styles.icon} />
            </span>
          </div>
        )}
      </div>
      <div className={styles.content_area}>{children}</div>
    </>
  );
}
