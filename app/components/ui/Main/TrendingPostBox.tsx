import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { useLoaderData } from "@remix-run/react";

// components
import RightContentBox from "~/components/ui/main/RightContentBox";
import { ClientOnly } from "remix-utils";
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
      <ClientOnly fallback={<div>Loading...</div>}>
        {() => (
          <Tab.Group
            defaultIndex={0}
            selectedIndex={selectedIndex}
            onChange={onChangeTab}
          >
            <Tab.List className="treding-post-tabs">
              <Tab
                value="7"
                as="button"
                className={({ selected }) =>
                  classNames("tab", {
                    active: selected,
                  })
                }
              >
                1 week
              </Tab>
              <Tab
                as="button"
                value="30"
                className={({ selected }) =>
                  classNames("tab", {
                    active: selected,
                  })
                }
              >
                1 months
              </Tab>
              <Tab
                as="button"
                value="90"
                className={({ selected }) =>
                  classNames("tab", {
                    active: selected,
                  })
                }
              >
                3 months
              </Tab>
              <Tab
                as="button"
                value="180"
                className={({ selected }) =>
                  classNames("tab", {
                    active: selected,
                  })
                }
              >
                6 months
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <TrendingSimplePost
                  duration={KEY_MAP_RECORD[0]}
                  enabled={selectedIndex === 0}
                  initialData={topPosts}
                />
              </Tab.Panel>
              <Tab.Panel>
                <TrendingSimplePost
                  duration={KEY_MAP_RECORD[1]}
                  enabled={selectedIndex === 1}
                />
              </Tab.Panel>
              <Tab.Panel>
                <TrendingSimplePost
                  duration={KEY_MAP_RECORD[2]}
                  enabled={selectedIndex === 2}
                />
              </Tab.Panel>
              <Tab.Panel>
                <TrendingSimplePost
                  duration={KEY_MAP_RECORD[3]}
                  enabled={selectedIndex === 3}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </ClientOnly>
    </RightContentBox>
  );
};

export default TrendingPostBox;
