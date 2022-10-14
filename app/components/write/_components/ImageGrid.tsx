import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useMemo, useRef } from "react";
import { getFileListApi } from "~/api/files";
import { QUERIES_KEY } from "~/constants/constant";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { optimizeAnimation } from "~/utils/util";
import ImageGridCard from "./ImageGridCard";

interface PicsumGridProps {}

const PicsumGrid: React.FC<PicsumGridProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    QUERIES_KEY.FILE.ROOT,
    async ({ pageParam = 0 }) => {
      const { result } = await getFileListApi({
        cursor: pageParam,
      });
      return result.result;
    },
    {
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor ?? undefined,
    }
  );

  const list = useMemo(() => {
    return data?.pages?.flatMap?.((page) => page.list) ?? [];
  }, [data]);

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 200 && hasNextPage) {
      fetchNextPage();
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  return (
    <div className="h-80 overflow-y-scroll" ref={ref}>
      <div className="grid grid-cols-8 gap-4 md:grid-cols-9">
        {list.map((item) => (
          <ImageGridCard key={`photo-item-${item.id}`} url={item.url} />
        ))}
      </div>
    </div>
  );
};

export default PicsumGrid;
