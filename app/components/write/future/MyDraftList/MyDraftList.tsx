import { useFetcher } from "@remix-run/react";
import { LeftSidebarContentArea } from "../LeftSidebarContentArea";
import { useCallback, useEffect, useState } from "react";
import { LeftSidebarContentItem } from "../LeftSidebarContentItem";
import styles from "./styles.module.css";
import uniqBy from "lodash-es/uniqBy";
import { getPath } from "~/routes/_loader._protected.loader.get-draft-posts[.]json";
import type { RoutesLoader } from "~/routes/_loader._protected.loader.get-draft-posts[.]json";
import { useWriteContext } from "~/context/useWriteContext";

const LIMIT = 30;

export default function MyDraftList() {
  const [items, setItems] = useState<FetchRespSchema.PostDetailResp[]>([]);

  const fetcher = useFetcher<RoutesLoader>();

  const { leftSideKeyword } = useWriteContext();

  const { data } = fetcher;

  const isIdle = fetcher.state === "idle" && fetcher.data == null;
  const isSuccessful = fetcher.state === "idle" && fetcher.data != null;

  const totalCount = data?.totalCount ?? 0;
  const pageInfo = data?.pageInfo;
  const list = data?.list ?? [];

  useEffect(() => {
    if (isIdle) {
      fetcher.load(getPath({ limit: LIMIT }));
    }
  }, []);

  useEffect(() => {
    if (isSuccessful) {
      const oldItems = items;
      const nextItems = list;
      const newItems = uniqBy([...oldItems, ...nextItems], "id");
      setItems(newItems);
    }
  }, [isSuccessful]);

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
    <LeftSidebarContentArea title={`My Drafts (${totalCount})`}>
      {fetcher.data && !totalCount && (
        <div className={styles.empty}>
          <p>You have not my drafts anything.</p>
        </div>
      )}
      {filteredItems.map((item) => {
        return (
          <LeftSidebarContentItem key={`my-draft-${item.id}`} item={item} />
        );
      })}
      {pageInfo && pageInfo.hasNextPage && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" className={styles.btn_load_more} onClick={onClickLoadMore}>
          Load more drafts
        </a>
      )}
    </LeftSidebarContentArea>
  );
}
