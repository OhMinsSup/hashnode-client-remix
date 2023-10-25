import { useFetcher } from "@remix-run/react";
import { LeftSidebarContentArea } from "../LeftSidebarContentArea";
import { useCallback, useEffect, useState } from "react";
import { LeftSidebarContentItem } from "../LeftSidebarContentItem";
import styles from "./styles.module.css";
import uniqBy from "lodash-es/uniqBy";
import { getPath } from "~/routes/_loader._protected.loader.get-draft-posts[.]json";
import type { Loader } from "~/routes/_loader._protected.loader.get-draft-posts[.]json";

const LIMIT = 30;

export default function MyDraftList() {
  const [items, setItems] = useState<FetchRespSchema.PostDetailResp[]>([]);

  const fetcher = useFetcher<Loader>();

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

  return (
    <LeftSidebarContentArea title={`My Drafts (${totalCount})`}>
      {fetcher.data && !totalCount && (
        <div className={styles.empty}>
          <p>You have not my drafts anything.</p>
        </div>
      )}
      {items.map((item) => {
        return (
          <LeftSidebarContentItem key={`my-draft-${item.id}`} item={item} />
        );
      })}
      {pageInfo && pageInfo.hasNextPage && (
        <a href="#" className={styles.btn_load_more} onClick={onClickLoadMore}>
          Load more drafts
        </a>
      )}
    </LeftSidebarContentArea>
  );
}
