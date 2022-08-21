import React, { useCallback, useRef, useState } from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { currentPhotoQuery } from "~/atoms/photoAtom";
import { useInfiniteScroll } from "~/libs/hooks/useInfiniteScroll";
import PicsumGridCard from "./PicsumGridCard";

interface PicsumGridProps {}

const PicsumGrid: React.FC<PicsumGridProps> = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);

  const ref = useRef<HTMLDivElement | null>(null);

  const list = useRecoilValue(
    currentPhotoQuery({
      page,
      limit,
    })
  );

  const fetchNext = useRecoilCallback(({ snapshot, set }) => () => {
    const next = page + 1;
    snapshot.getLoadable(
      currentPhotoQuery({
        page: next,
        limit,
      })
    );
    setPage(next);
  });

  useInfiniteScroll(ref, fetchNext);

  return (
    <div className="h-72">
      <div className=" grid grid-cols-8 gap-4 md:grid-cols-9">
        {list.map((item, i) => (
          <PicsumGridCard
            ref={list.at(-1)?.id === item.id ? ref : null}
            key={`photo-item-${item.id}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PicsumGrid;
