import { useCallback, useEffect } from "react";
import { CollapsibleWrapper } from "~/components/write/future/CollapsibleWrapper";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { useSubmittedDraftListInfiniteQuery } from "~/routes/api.v1.drafts.submitted";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { type RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useWriteContext } from "~/components/write/context/useWriteContext";

interface SubmittedDraftListProps {
  isDifferentPathname: boolean;
}

export default function SubmittedDraftList({
  isDifferentPathname,
}: SubmittedDraftListProps) {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const { originUrl } = useLoaderData<RoutesLoaderData>();

  const { data, fetchNextPage, isSuccess, refetch } =
    useSubmittedDraftListInfiniteQuery({
      originUrl,
      searchParams: {
        pageNo: "1",
      },
    });

  const pages = data?.pages ?? [];

  const result = pages.at(0)?.result;

  const items = pages.map((page) => page?.result?.list ?? []).flat() ?? [];

  const loadNext = useCallback(() => {
    if (result && result.pageInfo.hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, result]);

  useEffect(() => {
    if (isDifferentPathname && isSuccess) {
      refetch();
    }
  }, [isDifferentPathname, isSuccess]);

  return (
    <CollapsibleWrapper
      title="Submitted Drafts"
      searchTitle={
        searchKeyword
          ? `Showing results for Submitted: ${searchKeyword}`
          : undefined
      }
      isSearch={Boolean(searchKeyword)}
      totalCount={result?.totalCount ?? 0}
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
      {isSuccess && items.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          You do not have any incoming drafts.
        </p>
      ) : null}
      {isSuccess && result?.pageInfo?.hasNextPage ? (
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
