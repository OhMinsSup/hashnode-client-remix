import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

// hooks
import { useSimpleTrendingPostsQuery } from "~/api/posts/posts";

// components
import RightContentBox from "./RightContentBox";
import { Tab } from "@headlessui/react";
import { TrendingSimplePost } from "~/components/common";

interface TrendingPostBoxProps {}

const MAP: Record<number, "1W" | "1M" | "3M" | "6M"> = {
  0: "1W",
  1: "1M",
  2: "3M",
  3: "6M",
};

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { result } = useSimpleTrendingPostsQuery(
    {
      dataType: MAP[selectedIndex],
    },
    {
      keepPreviousData: true,
    }
  );

  const simpleTrending = useMemo(() => result?.list ?? [], [result]);

  const onChangeTab = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <RightContentBox title="Trending" to="/">
      <Tab.Group selectedIndex={selectedIndex} onChange={onChangeTab}>
        <Tab.List className="mb-4 flex flex-row items-center overflow-auto whitespace-nowrap border-b text-sm text-gray-500">
          <Tab
            value="1W"
            className={({ selected }) =>
              classNames(
                "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                {
                  "border-b-blue-500 text-blue-500": selected,
                  "border-transparent": !selected,
                }
              )
            }
          >
            1 week
          </Tab>
          <Tab
            value="1M"
            className={({ selected }) =>
              classNames(
                "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                {
                  "border-b-blue-500 text-blue-500": selected,
                  "border-transparent": !selected,
                }
              )
            }
          >
            1 months
          </Tab>
          <Tab
            value="3M"
            className={({ selected }) =>
              classNames(
                "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                {
                  "border-b-blue-500 text-blue-500": selected,
                  "border-transparent": !selected,
                }
              )
            }
          >
            3 months
          </Tab>
          <Tab
            value="6M"
            className={({ selected }) =>
              classNames(
                "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                {
                  "border-b-blue-500 text-blue-500": selected,
                  "border-transparent": !selected,
                }
              )
            }
          >
            6 months
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="1W" simpleTrending={simpleTrending} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="1M" simpleTrending={simpleTrending} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="3M" simpleTrending={simpleTrending} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="6M" simpleTrending={simpleTrending} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
};

export default TrendingPostBox;
