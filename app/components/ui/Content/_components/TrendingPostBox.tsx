import React, { useState } from "react";
import classNames from "classnames";

// hooks
import { useLoaderData } from "@remix-run/react";

// components
import RightContentBox from "./RightContentBox";

import { Tab } from "@headlessui/react";
import { TrendingSimplePost } from "~/components/common";

interface TrendingPostBoxProps {}

const TrendingPostBox: React.FC<TrendingPostBoxProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { simpleTrending } = useLoaderData<Record<string, any>>();

  return (
    <RightContentBox title="Trending" to="/">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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
            <TrendingSimplePost type="1W" simpleTrending={simpleTrending} />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost type="1M" />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost type="3M" />
          </Tab.Panel>
          <Tab.Panel className="space-y-4 divide-y">
            <TrendingSimplePost type="6M" />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RightContentBox>
  );
};

export default TrendingPostBox;
