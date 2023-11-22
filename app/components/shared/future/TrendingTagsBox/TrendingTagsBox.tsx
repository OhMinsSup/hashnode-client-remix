import { Icons } from "~/components/shared/Icons";
import { TrendingTag } from "~/components/shared/future/TrendingTag";
import { isEmpty, isUndefined } from "~/utils/assertion";
import styles from "./styles.module.css";
import { Link } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface TrendingTagsBoxProps {
  data?: FetchRespSchema.TagListResp;
}

export default function TrendingTagsBox({ data }: TrendingTagsBoxProps) {
  if (isUndefined(data)) return null;

  const tags = data.list ?? [];

  if (isEmpty(tags)) return null;

  return (
    <div className={styles.root}>
      <div className={styles.title_area}>
        <div>Trending tags this week</div>
        <Link to={PAGE_ENDPOINTS.EXPLORE.TAGS}>
          <span className={styles.title_link_container}>
            <span>Browse more tags</span>
            <Icons.V2.MoveRight />
          </span>
        </Link>
      </div>
      <div className={styles.content_area}>
        {tags.map((tag) => {
          return <TrendingTag key={`trending-tag-${tag.id}`} tag={tag} />;
        })}
      </div>
    </div>
  );
}
