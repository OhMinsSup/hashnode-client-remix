import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { useLoaderData } from "@remix-run/react";

// components
import RightContentBox from "./RightContentBox";
import { Tab } from "@headlessui/react";
import { TrendingSimplePost } from "~/components/common";

interface TrendingPostBoxProps {}

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const { topPosts } = useLoaderData();

  const KEY_MAP_RECORD: Record<number, string> = useMemo(() => {
    return {
      0: "7",
      1: "30",
      2: "90",
      3: "180",
    };
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChangeTab = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <RightContentBox title="Trending" to="/">
      <Tab.Group selectedIndex={selectedIndex} onChange={onChangeTab}>
        <Tab.List className="mb-4 flex flex-row items-center overflow-auto whitespace-nowrap border-b text-sm text-gray-500">
          <Tab
            value="7"
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
            value="30"
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
            value="90"
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
            value="180"
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
            <TrendingSimplePost
              duration={KEY_MAP_RECORD[0]}
              enabled={selectedIndex === 0}
              initialData={topPosts}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost
              duration={KEY_MAP_RECORD[1]}
              enabled={selectedIndex === 1}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost
              duration={KEY_MAP_RECORD[2]}
              enabled={selectedIndex === 2}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost
              duration={KEY_MAP_RECORD[3]}
              enabled={selectedIndex === 3}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
};

export default TrendingPostBox;
