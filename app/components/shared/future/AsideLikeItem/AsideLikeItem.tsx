import React from "react";
import styles from "./styles.module.css";
import type { SerializeFrom } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface AsideLikeItemProps {
  data: SerializeFrom<SerializeSchema.SerializePost>;
}

export default function AsideLikeItem({ data }: AsideLikeItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2
        className={styles.item_title}
        aria-label="Post Title"
        title={data.title}
      >
        {data.title}
      </h2>
      <div className={styles.item_desc}>
        <p>
          <Link
            to={PAGE_ENDPOINTS.USERS.ID(data?.user?.id)}
            aria-label="Post Author"
            title={data?.user?.userProfile?.username}
          >
            {data?.user?.userProfile?.username}
          </Link>
        </p>
        <span className="inline-block mx-2 font-bold opacity-50">·</span>
        <p>9 min read</p>
      </div>
    </div>
  );
}
