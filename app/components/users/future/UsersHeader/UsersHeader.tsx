import styles from "./styles.module.css";
import dayjs from "dayjs";
import { useLoaderData } from "@remix-run/react";
import { UserHeaderProfileImg } from "../UserHeaderProfileImg";
import { UserHeaderProfileInfo } from "../UserHeaderProfileInfo";

// types
import type { RoutesLoader } from "~/routes/_user.(@).$userId._index";

export default function UsersHeader() {
  const data = useLoaderData<RoutesLoader>();
  const since = data?.createdAt ? new Date(data.createdAt) : new Date();
  const sinceFormatted = dayjs(since).format("MMM, YYYY");

  return (
    <div className="grid xl:grid-cols-12 2xl:grid-cols-10">
      <div className={styles.root}>
        <div className={styles.content}>
          <UserHeaderProfileImg />
          <UserHeaderProfileInfo />
        </div>
      </div>
      <div className={styles.footer}>
        <div></div>
        <div className={styles.footer_content}>
          <svg viewBox="0 0 448 512">
            <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"></path>
          </svg>
          <span>Member Since {sinceFormatted}</span>
        </div>
      </div>
    </div>
  );
}
