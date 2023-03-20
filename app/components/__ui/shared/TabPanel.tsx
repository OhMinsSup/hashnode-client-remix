import React, { useRef } from "react";
import classNames from "classnames";
import { useTabPanel } from "react-aria";

import type { AriaTabPanelProps } from "react-aria";
import type { TabListState } from "react-stately";
import type { Argument } from "classnames";

interface TabPanelProps<T = unknown> extends AriaTabPanelProps {
  state: TabListState<T>;
  className?: Argument;
}

const TabPanel: React.FC<TabPanelProps> = ({ state, className, ...props }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} className={classNames(className)} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
};

export default TabPanel;
