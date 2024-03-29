import React from "react";
import styles from "./styles.module.css";
import { Link, useLoaderData } from "@remix-run/react";
import { useOptionalSession } from "~/services/hooks/useSession";
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { RoutesLoader } from "~/routes/_user.(@).$userId._index";

export default function UserHeaderProfileInfo() {
  const data = useLoaderData<RoutesLoader>();
  const session = useOptionalSession();
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.desc_container}>
          <div className={styles.title_container}>
            <h1>
              <Link itemProp="url" to={PAGE_ENDPOINTS.USERS.ID(data.id)}>
                <span itemProp="name">{data?.userProfile?.username}</span>
              </Link>
            </h1>
          </div>
          <p itemProp="description">{data?.userProfile?.tagline}</p>
        </div>
        {session && session.id === data.id ? (
          <div className={styles.action_container}>
            <Link
              to={PAGE_ENDPOINTS.SETTINGS.ROOT}
              className={styles.btn_setting}
            >
              <svg className="css-1fuh9hb" viewBox="0 0 512 512">
                <path d="M493.255 56.236l-37.49-37.49c-24.993-24.993-65.515-24.994-90.51 0L12.838 371.162.151 485.346c-1.698 15.286 11.22 28.203 26.504 26.504l114.184-12.687 352.417-352.417c24.992-24.994 24.992-65.517-.001-90.51zM164.686 347.313c6.249 6.249 16.379 6.248 22.627 0L368 166.627l30.059 30.059L174 420.745V386h-48v-48H91.255l224.059-224.059L345.373 144 164.686 324.687c-6.249 6.248-6.249 16.378 0 22.626zm-38.539 121.285l-58.995 6.555-30.305-30.305 6.555-58.995L63.255 366H98v48h48v34.745l-19.853 19.853zm344.48-344.48l-49.941 49.941-82.745-82.745 49.941-49.941c12.505-12.505 32.748-12.507 45.255 0l37.49 37.49c12.506 12.506 12.507 32.747 0 45.255z"></path>
              </svg>
              <span>Edit</span>
            </Link>
          </div>
        ) : null}
      </div>
      <div className={styles.follow_container}>
        <a href="/@veloss990/following">
          <span className="font-bold">{data?.followerCount}</span> Followers
        </a>
        <a href="/@veloss990/following">
          <span className="font-bold">{data?.followingCount}</span> Following
        </a>
      </div>
    </div>
  );
}
