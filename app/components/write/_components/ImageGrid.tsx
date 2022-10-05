import React, { useRef } from "react";
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

  const scrollMethod = optimizeAnimation(() => {
    const el = getTargetElement(ref);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 200) {
      console.log("load more");
    }
  });

  useEventListener("scroll", scrollMethod, { target: ref });

  return (
    <div className="h-80 overflow-y-scroll" ref={ref}>
      <div className="grid grid-cols-8 gap-4 md:grid-cols-9">
        {Array.from({ length: 30 }).map((_, i) => (
          <ImageGridCard
            key={`photo-item-${i}`}
            url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqSizWZqSm1U1zNtLzzDJa5eHMlM20CS4Rg&usqp=CAU"
          />
        ))}
      </div>
    </div>
  );
};

export default PicsumGrid;
