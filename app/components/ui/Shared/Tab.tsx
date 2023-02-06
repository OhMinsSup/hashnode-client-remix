import React, { useRef } from "react";
import { useTab } from "react-aria";
import classNames from "classnames";

import type { Node, Orientation } from "@react-types/shared";
import type { TabListState } from "react-stately";
import type { Argument } from "classnames";

interface TabProps<T = unknown> {
  state: TabListState<T>;
  item: Node<T>;
  orientation?: Orientation;
  className?: Argument;
}

const Tab: React.FC<TabProps> = ({ item, state, className }) => {
  const { key, rendered } = item;
  const ref = useRef<HTMLDivElement | null>(null);
  const { tabProps } = useTab({ key }, state, ref);

  return (
    <div {...tabProps} className={classNames(className)} ref={ref}>
      {rendered}
    </div>
  );
};

export default Tab;
