import { useFetcher } from "@remix-run/react";
import { LeftSidebarContentArea } from "../LeftSidebarContentArea";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import uniqBy from "lodash-es/uniqBy";
import { getPath } from "~/routes/_loader._protected.loader.get-deleted-posts[.]json";
import type { Loader } from "~/routes/_loader._protected.loader.get-deleted-posts[.]json";
import { LeftSidebarContentItem } from "../LeftSidebarContentItem";
import { useWriteContext } from "~/context/useWriteContext";

const LIMIT = 30;

export default function DeletedList() {
  const [items, setItems] = useState<FetchRespSchema.PostDetailResp[]>([]);

  const fetcher = useFetcher<Loader>();

  const { leftSideKeyword } = useWriteContext();

  const totalCount = fetcher?.data?.totalCount ?? 0;

  const pageInfo = fetcher?.data?.pageInfo;

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data == null) {
      fetcher.load(getPath({ limit: LIMIT }));
    }
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setItems((prevItems) =>
        uniqBy([...prevItems, ...(fetcher.data?.list ?? [])], "id")
      );
    }
  }, [fetcher.data]);

  const onClickLoadMore = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();

      if (pageInfo && pageInfo?.hasNextPage && pageInfo?.endCursor) {
        fetcher.load(getPath({ cursor: pageInfo?.endCursor, limit: LIMIT }));
      }
    },
    [fetcher, pageInfo]
  );

  const filteredItems = items.filter((item) => {
    if (!leftSideKeyword) return true;
    return item.title.includes(leftSideKeyword);
  });

  return (
    <LeftSidebarContentArea title={`DELETED ARTICLES (${totalCount})`}>
      {fetcher.data && !totalCount && (
        <div className={styles.empty}>
          <p>You have not deleted article anything.</p>
        </div>
      )}
      {filteredItems.map((item) => {
        return (
          <LeftSidebarContentItem
            key={`delete-item-${item.id}`}
            item={item}
            type="deleted"
          />
        );
      })}
      {pageInfo && pageInfo.hasNextPage && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className={styles.btn_load_more} onClick={onClickLoadMore}>
          Load more deleted articles
        </a>
      )}
    </LeftSidebarContentArea>
  );
}
