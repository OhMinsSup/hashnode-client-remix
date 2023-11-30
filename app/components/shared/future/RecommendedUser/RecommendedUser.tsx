import React from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { Link } from "@remix-run/react";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import type { SerializeFrom } from "@remix-run/cloudflare";

interface RecommendedUserProps {
  user: SerializeFrom<FetchRespSchema.UserResponse>;
}

export default function RecommendedUser({ user }: RecommendedUserProps) {
  return (
    <div className={styles.root}>
      <Link className={styles.image_link} to={PAGE_ENDPOINTS.USERS.ID(user.id)}>
        <div className="w-full h-full">
          <div className={styles.image_container}>
            <img
              loading="lazy"
              src={user?.userImage?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR}
              alt={user?.userProfile?.username ?? "profile"}
            />
          </div>
        </div>
      </Link>
      <div className={styles.content_container}>
        <h3 className={styles.title}>
          <Link
            aria-label={user?.userProfile?.username}
            to={PAGE_ENDPOINTS.USERS.ID(user.id)}
          >
            {user?.userProfile?.username}
          </Link>
        </h3>
        <p className={styles.count}>
          <a
            target="_blank"
            rel="noreferrer"
            aria-label="hameteman.com"
            href="https://avocadev.hashnode.dev/"
          >
            avocadev.hashnode.dev
          </a>
        </p>
      </div>
      <div className={styles.btn_follow_container}>
        <button className={styles.btn_follow} aria-label="Follow user">
          <Icons.V2.FollowUser />
          {/* <Icons.V2.FollowChecked /> */}
        </button>
      </div>
    </div>
  );
}
