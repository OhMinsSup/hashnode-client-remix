import { useCallback, useMemo, useTransition } from 'react';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useWriteContext } from '~/components/write/context/useWriteContext';
import { SidebarPublishedItem } from '~/components/write/future/SidebarPublishedItem';
import { usePostPublishedInfiniteQuery } from '~/routes/api.v1.posts.published';

export default function PublishedList() {
  const { leftSideKeyword: searchKeyword } = useWriteContext();

  const [isPending, startTransition] = useTransition();

  const { data, fetchNextPage, error, isFetchingNextPage } =
    usePostPublishedInfiniteQuery();

  const pages = useMemo(() => data?.pages ?? [], [data]);

  const result = useMemo(() => pages.at(-1)?.result, [pages]);

  const totalCount = useMemo(() => result?.totalCount ?? 0, [result]);

  const items = useMemo(
    () => pages.map((page) => page?.result?.list ?? []).flat() ?? [],
    [pages],
  );

  const isSuccess = useMemo(
    () => !error && data && items.length > 0,
    [data, error, items.length],
  );

  const loadNext = useCallback(() => {
    if (result && result.pageInfo.hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, result]);

  const isSearch = Boolean(searchKeyword);

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
          <SidebarPublishedItem
            key={`submitted-draft-${item.id}`}
            item={item}
          />
        ))}
      {isSuccess && totalCount === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          You have not published anything.
        </p>
      ) : null}
      {isSearch ? null : (
        <>
          {isSuccess && result?.pageInfo?.hasNextPage ? (
            <div className="group relative grid grid-cols-12 sm:block">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full justify-start space-x-2"
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
