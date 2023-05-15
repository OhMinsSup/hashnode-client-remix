import React, { useRef, useMemo } from "react";

// utils
import { optimizeAnimation } from "~/utils/util";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

// hooks
import { useImageFilesQuery } from "~/api/files/hooks/useImageFilesQuery";
import { useEventListener } from "~/libs/hooks/useEventListener";

// components
import DraftImageCoverPopoverLibraryItem from "./DraftImageCoverPopoverLibraryItem";

interface DraftImageCoverPopoverLibraryListProps {
  onChangeOpenState: (value: boolean) => void;
}

export default function DraftImageCoverPopoverLibraryList({
  onChangeOpenState,
}: DraftImageCoverPopoverLibraryListProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage } = useImageFilesQuery({
    limit: 4,
  });

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
    <div className="pt-4">
      <div className="h-72 overflow-y-scroll" ref={ref}>
        <div className="grid grid-cols-8 gap-4">
          {list.map((item) => {
            return (
              <DraftImageCoverPopoverLibraryItem
                item={item}
                key={`library-item-${item.id}`}
                onChangeOpenState={onChangeOpenState}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
