import { useEffect, useRef, useState } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { type RoutesLoaderData, getPath } from "~/routes/api.v1.drafts";
import { useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function MyDraftList() {
  const [totalCount, setTotalCount] = useState(0);
  const [items, setItems] = useState<SerializeSchema.SerializePost<false>[][]>(
    []
  );

  const fetching = useRef(false);
  const fetcher = useFetcher<RoutesLoaderData>();

  const pages = items.flat();

  const loading = !fetcher.data || fetcher.state === "loading";

  useEffect(() => {
    if (loading && !items.length) {
      const searchParams = new URLSearchParams();
      searchParams.set("pageNo", "1");
      fetcher.load(getPath(searchParams));
    }
  }, []);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") {
      return;
    }
    // If we have new data - append it
    if (fetcher.data && fetcher.data.result) {
      const result = fetcher.data.result;
      const newItems =
        result.list as unknown as SerializeSchema.SerializePost<false>[];

      if (!fetching.current) {
        setTotalCount(result.totalCount);
        setItems((prev) => [...prev, newItems]);
        fetching.current = true;
      }
    }
  }, [fetcher.data]);

  const loadNext = () => {
    if (fetcher.data && fetcher.data.result) {
      const { pageInfo } = fetcher.data
        .result as unknown as FetchRespSchema.ListResp<
        SerializeSchema.SerializePost<false>
      >;
      if (pageInfo.hasNextPage && pageInfo.nextPage) {
        fetching.current = false;
        const searchParams = new URLSearchParams();
        searchParams.set("pageNo", `${pageInfo.nextPage}`);
        fetcher.load(getPath(searchParams));
      }
    }
  };

  return (
    <CollapsibleWrapper
      title="My Drafts"
      totalCount={totalCount}
      emptyComponent={
        items.length === 0 ? (
          <p className="px-4 text-sm text-muted-foreground">
            You have not created any drafts.
          </p>
        ) : null
      }
    >
      {pages.map((item) => (
        <SidebarDraftItem key={`my-draft-${item.id}`} item={item} />
      ))}

      {fetcher.data?.result?.pageInfo?.hasNextPage && (
        <div className="group grid relative grid-cols-12 sm:block">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className=" justify-start w-full"
            onClick={() => loadNext()}
          >
            <div className="truncate text-left">더보기</div>
          </Button>
        </div>
      )}
    </CollapsibleWrapper>
  );
}
