import { useCallback } from "react";
import styles from "./styles.module.css";
import { Icons } from "~/components/shared/Icons";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import { ASSET_URL, PAGE_ENDPOINTS } from "~/constants/constant";
import { getPath } from "~/routes/_action._protected.action.tag.follow";

// types
import type { Action } from "~/routes/_action._protected.action.tag.follow";

interface TrendingTagProps {
  tag: SerializeSchema.SerializeTagCount;
}

export default function TrendingTag({ tag }: TrendingTagProps) {
  const fetcher = useFetcher<Action>();
  const location = useLocation();

  const onClick = useCallback(() => {
    const formData = new FormData();
    formData.append("tagId", tag.id);
    formData.append("redirectUrl", location.pathname);
    fetcher.submit(formData, {
      action: getPath(),
      method: "POST",
      encType: "multipart/form-data",
      navigate: false,
      preventScrollReset: false,
    });
  }, [tag, fetcher, location.pathname]);

  return (
    <div className={styles.root}>
      <Link className={styles.image_link} to={PAGE_ENDPOINTS.N.TAG(tag.id)}>
        <div className={styles.image_container}>
          <img loading="lazy" src={ASSET_URL.DEFAULT_TAG} alt={tag.name} />
        </div>
      </Link>
      <div className={styles.content_container}>
        <h3 className={styles.title}>
          <Link aria-label={tag.name} to={PAGE_ENDPOINTS.N.TAG(tag.id)}>
            {tag.name}
          </Link>
        </h3>
        <p className={styles.count}>
          <Link
            aria-label={`${tag.postCount} articles`}
            to={PAGE_ENDPOINTS.N.TAG(tag.id)}
          >
            {tag.postCount} articles
          </Link>
        </p>
      </div>
      <div className={styles.btn_follow_container}>
        <button
          type="button"
          className={styles.btn_follow}
          aria-label="Follow blog"
          onClick={onClick}
        >
          {tag.isFollow ? <Icons.V2.FollowChecked /> : <Icons.V2.FollowTag />}
        </button>
      </div>
    </div>
  );
}
