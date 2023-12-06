import styles from "./styles.module.css";
import { Link, useLoaderData } from "@remix-run/react";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { RoutesLoader } from "~/routes/_user.(@).$userId._index";

export default function UserHeaderProfileImg() {
  const data = useLoaderData<RoutesLoader>();
  return (
    <Link to={PAGE_ENDPOINTS.USERS.ID(data.id)} className={styles.root}>
      <div className={styles.image}>
        <img
          alt={data?.userProfile?.username}
          src={data?.userImage?.avatarUrl || ASSET_URL.DEFAULT_AVATAR}
          decoding="async"
          loading="lazy"
          className="rounded-full"
        />
      </div>
    </Link>
  );
}
