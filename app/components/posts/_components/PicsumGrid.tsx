import React, { useRef } from "react";
import { usePhotoQuery } from "~/atoms/photoAtom";
import {
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";
import PicsumGridCard from "./PicsumGridCard";

interface PicsumGridProps {}

const PicsumGrid: React.FC<PicsumGridProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { fetchNext, photos } = usePhotoQuery();

  const scrollMethod = () => {
    const el = getTargetElement(ref);
    console.log("element", el);
    if (!el) {
      return;
    }

    const scrollTop = getScrollTop(el);
    const scrollHeight = getScrollHeight(el);
    const clientHeight = getClientHeight(el);

    if (scrollHeight - scrollTop <= clientHeight + 100) {
      fetchNext();
    }
  };

  useEventListener(
    "scroll",
    () => {
      console.log("target");
      scrollMethod();
    },
    { target: ref }
  );

  return (
    <div className="h-80" ref={ref}>
      <div className="grid grid-cols-8 gap-4 overflow-y-scroll md:grid-cols-9">
        {photos.map((item, i) => (
          <PicsumGridCard key={`photo-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};

export default PicsumGrid;
