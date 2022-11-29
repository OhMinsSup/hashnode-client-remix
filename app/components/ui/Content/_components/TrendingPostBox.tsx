import React, { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { useFetcher, useLoaderData } from "@remix-run/react";

// components
import RightContentBox from "./RightContentBox";
import { Tab } from "@headlessui/react";
import { TrendingSimplePost } from "~/components/common";

import type { PostDetailRespSchema } from "~/api/schema/resp";

interface TrendingPostBoxProps {}

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const { trendingPosts } = useLoaderData();

  const KEY_MAP_RECORD: Record<number, "1W" | "1M" | "3M" | "6M"> =
    useMemo(() => {
      return {
        0: "1W",
        1: "1M",
        2: "3M",
        3: "6M",
      };
    }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [items, setItems] = useState<PostDetailRespSchema[]>(
    trendingPosts?.list ?? []
  );

  const fetcher = useFetcher();

  const onChangeTab = useCallback(
    (index: number) => {
      const dateType = KEY_MAP_RECORD[index];
      setSelectedIndex(index);
      fetcher.load(`?index&dateType=${dateType}`);
    },
    [KEY_MAP_RECORD, fetcher]
  );

  useEffect(() => {
    if (fetcher.data) {
      const { trendingPosts } = fetcher.data;
      const nextItems = trendingPosts?.list ?? [];
      setItems(nextItems);
    }
  }, [fetcher.data]);

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
            <TrendingSimplePost type="1W" simpleTrending={items} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="1M" simpleTrending={items} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="3M" simpleTrending={items} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            {/* @ts-ignore */}
            <TrendingSimplePost type="6M" simpleTrending={items} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
};

export default TrendingPostBox;
