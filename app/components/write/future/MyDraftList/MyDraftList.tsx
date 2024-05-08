import { useCallback } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { useDraftListInfiniteQuery } from "~/routes/api.v1.drafts";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { type RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useWriteContext } from "~/components/write/context/useWriteContext";

export default function MyDraftList() {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const { originUrl } = useLoaderData<RoutesLoaderData>();

  const { data, fetchNextPage, error } = useDraftListInfiniteQuery({
    originUrl,
  });

  const isSuccess = !error && data && typeof data?.pages.at(0) !== "undefined";

  const pages = data?.pages ?? [];

  const result = pages.at(0)?.result;

  const totalCount = result?.totalCount ?? 0;

  const items = pages.map((page) => page?.result?.list ?? []).flat() ?? [];

  const loadNext = useCallback(() => {
    if (result && result.pageInfo.hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, result]);

  // useEffect(() => {
  //   if (isDifferentPathname && isSuccess) {
  //     console.log("MyDraftList - refetch");
  //     refetch();
  //   }
  // }, [isDifferentPathname, isSuccess, refetch]);

  const isSearch = Boolean(searchKeyword);

  return (
    <CollapsibleWrapper
      title="My Drafts"
      searchTitle={
        isSearch ? `Showing results for Draft: ${searchKeyword}` : undefined
      }
      isSearch={isSearch}
      totalCount={totalCount}
    >
      {items
        .filter((item) => {
          if (searchKeyword && searchKeyword.length > 0) {
            return item.title.includes(searchKeyword);
          }
          return true;
        })
        .map((item) => (
          <SidebarDraftItem key={`my-draft-${item.id}`} item={item} />
        ))}
      {isSuccess && totalCount === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          You have not created any drafts.
        </p>
      ) : null}
      {!isSearch && isSuccess && result?.pageInfo?.hasNextPage ? (
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
      ) : null}
    </CollapsibleWrapper>
  );
}
