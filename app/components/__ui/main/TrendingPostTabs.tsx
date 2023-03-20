import React, { useRef } from "react";
import { useTabList } from "react-aria";
import { useTabListState } from "react-stately";

// components
import Tab from "~/components/__ui/shared/Tab";
import TabPanel from "~/components/__ui/shared/TabPanel";

// types
import type { Argument } from "classnames";
import type { AriaTabListProps } from "react-aria";
import type { TabListProps } from "react-stately";

interface TrendingPostTabsProps<T = object>
  extends TabListProps<T>,
    AriaTabListProps<T> {
  className?: Argument;
}

const TrendingPostTabs: React.FC<TrendingPostTabsProps> = ({
  className,
  ...props
}) => {
  const state = useTabListState(props);
  const ref = useRef<HTMLDivElement | null>(null);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <>
      <div {...tabListProps} className="treding-post-tabs" ref={ref}>
        {[...state.collection].map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            className="tab"
            orientation={props.orientation}
          />
        ))}
      </div>
      <div>
        <div>
          <TabPanel key={state.selectedItem?.key} state={state} />
        </div>
      </div>
    </>
  );
};

export default TrendingPostTabs;
