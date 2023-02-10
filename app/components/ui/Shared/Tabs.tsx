import React, { useRef } from "react";
import classNames from "classnames";
import { useTabList } from "react-aria";
import { useTabListState } from "react-stately";

// components
import Tab from "~/components/ui/shared/Tab";
import TabPanel from "~/components/ui/shared/TabPanel";

// types
import type { Argument } from "classnames";
import type { AriaTabListProps } from "react-aria";
import type { TabListProps } from "react-stately";

interface TabsProps<T = object> extends TabListProps<T>, AriaTabListProps<T> {
  className?: Argument;
  wrapperClassName?: Argument;
  itemClassName?: Argument;
  panelClassName?: Argument;
  afterTab?: React.ReactNode;
  beforeTab?: React.ReactNode;
  afterPanel?: React.ReactNode;
  beforePanel?: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  className,
  wrapperClassName,
  itemClassName,
  panelClassName,
  afterTab,
  beforeTab,
  afterPanel,
  beforePanel,
  ...props
}) => {
  const state = useTabListState(props);
  const ref = useRef<HTMLDivElement | null>(null);
  const { tabListProps } = useTabList(props, state, ref);

  return (
    <>
      <div className={classNames(wrapperClassName)}>
        {beforeTab}
        <div className={classNames("tabs", className, props.orientation)}>
          <div {...tabListProps} className="tab-wrapper" ref={ref}>
            {[...state.collection].map((item) => (
              <Tab
                key={item.key}
                item={item}
                state={state}
                className={itemClassName}
                orientation={props.orientation}
              />
            ))}
          </div>
        </div>
        {afterTab}
      </div>
      {beforePanel}
      <TabPanel
        key={state.selectedItem?.key}
        className={panelClassName}
        state={state}
      />
      {afterPanel}
    </>
  );
};

export default Tabs;
