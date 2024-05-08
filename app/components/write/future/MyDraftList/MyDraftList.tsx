import { useCallback, useEffect, useMemo, useTransition } from "react";
import { SidebarDraftItem } from "~/components/write/future/SidebarDraftItem";
import { useDraftInfiniteQuery } from "~/routes/api.v1.drafts";
import { Button } from "~/components/ui/button";
import { useLoaderData } from "@remix-run/react";
import { type RoutesLoaderData } from "~/.server/routes/write/write-layout.loader";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import { Icons } from "~/components/icons";

interface MyDraftListProps {
  handleTotalCount: (count: number) => void;
}

export default function MyDraftList({ handleTotalCount }: MyDraftListProps) {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const { originUrl } = useLoaderData<RoutesLoaderData>();

  const [isPending, startTransition] = useTransition();

  const { data, fetchNextPage, error, isFetchingNextPage } =
    useDraftInfiniteQuery({
      originUrl,
    });

  const pages = useMemo(() => data?.pages ?? [], [data]);

  const result = useMemo(() => pages.at(-1)?.result, [pages]);

  const totalCount = useMemo(() => result?.totalCount ?? 0, [result]);

  const items = useMemo(
    () => pages.map((page) => page?.result?.list ?? []).flat() ?? [],
    [pages]
  );

  const isSuccess = useMemo(
    () => !error && data && items.length > 0,
    [data, error, items.length]
  );

  const loadNext = useCallback(() => {
    if (result && result.pageInfo.hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, result]);

  const isSearch = Boolean(searchKeyword);

  useEffect(() => {
    handleTotalCount(totalCount);
  }, [handleTotalCount, totalCount]);

  console.log("MyDraftList.tsx: data", result?.pageInfo?.hasNextPage);

  return (
    <>
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
      {isSearch ? null : (
        <>
          {isSuccess && result?.pageInfo?.hasNextPage ? (
            <div className="group grid relative grid-cols-12 sm:block">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="justify-start w-full space-x-2"
                onClick={() => startTransition(() => loadNext())}
              >
                {isFetchingNextPage || isPending ? (
                  <Icons.spinner className="animate-spin" />
                ) : null}
                <div className="truncate text-left">더보기</div>
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
