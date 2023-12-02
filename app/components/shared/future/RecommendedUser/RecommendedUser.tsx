import React, { useCallback } from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { getPath } from "~/routes/_action._protected.action.user.follow";

import type { SerializeFrom } from "@remix-run/cloudflare";
import type { Action } from "~/routes/_action._protected.action.user.follow";

interface RecommendedUserProps {
  user: SerializeFrom<FetchRespSchema.UserResponse>;
}

export default function RecommendedUser({ user }: RecommendedUserProps) {
  const fetcher = useFetcher<Action>();
  const location = useLocation();

  const onClick = useCallback(() => {
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("redirectUrl", location.pathname);
    fetcher.submit(formData, {
      action: getPath(),
      method: "POST",
      encType: "multipart/form-data",
      navigate: false,
      preventScrollReset: false,
    });
  }, [user, fetcher, location.pathname]);

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
        <button
          type="button"
          className={styles.btn_follow}
          aria-label="Follow user"
          onClick={onClick}
        >
          {user?.isFollow ? (
            <Icons.V2.FollowChecked />
          ) : (
            <Icons.V2.FollowUser />
          )}
        </button>
      </div>
    </div>
  );
}
