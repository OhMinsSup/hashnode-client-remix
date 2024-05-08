import { useCallback, useTransition } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { useSubmittedDraftListInfiniteQuery } from "~/routes/api.v1.drafts.submitted";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { type RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useWriteContext } from "~/components/write/context/useWriteContext";

export default function SubmittedDraftList() {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const { originUrl } = useLoaderData<RoutesLoaderData>();

  const [, startTransition] = useTransition();

  const { data, fetchNextPage, error } = useSubmittedDraftListInfiniteQuery({
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

  const isSearch = Boolean(searchKeyword);

  return (
    <CollapsibleWrapper
      title="Submitted Drafts"
      searchTitle={
        isSearch ? `Showing results for Submitted: ${searchKeyword}` : undefined
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
          <SidebarDraftItem key={`submitted-draft-${item.id}`} item={item} />
        ))}
      {isSuccess && totalCount === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          You do not have any incoming drafts.
        </p>
      ) : null}
      {!isSearch && isSuccess && result?.pageInfo?.hasNextPage ? (
        <div className="group grid relative grid-cols-12 sm:block">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className=" justify-start w-full"
            onClick={() => startTransition(() => loadNext())}
          >
            <div className="truncate text-left">더보기</div>
          </Button>
        </div>
      ) : null}
    </CollapsibleWrapper>
  );
}
