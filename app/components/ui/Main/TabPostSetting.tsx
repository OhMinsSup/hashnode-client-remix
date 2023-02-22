import React, { useCallback, useMemo } from "react";
import classNames from "classnames";

// components
import Button from "~/components/ui/shared/Button";
import PopoverTrigger from "~/components/ui/shared/PopoverTrigger";
import { SimpleDialog } from "~/components/ui/shared/Dialog";
import {
  FilterIcon,
  ViewTypeClassicIcon,
  ViewTypeModernIcon,
} from "~/components/ui/Icon";

// hooks
import { useListContext } from "~/context/useListContext";

// types
import type { PressEvent } from "@react-types/shared";

const TabPostSetting = () => {
  const {
    isFilter,
    isViewType,
    viewType,
    openFilter,
    closeFilter,
    openViewType,
    closeViewType,
    changeViewType,
  } = useListContext();

  const onPress = useCallback(
    (e: PressEvent) => {
      if (isFilter) closeFilter();
      else openFilter();
    },
    [isFilter, closeFilter, openFilter]
  );

  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) openViewType();
      else closeViewType();
    },
    [closeViewType, openViewType]
  );

  const onPressClassic = useCallback(
    (e: PressEvent) => {
      if (viewType === "CLASSIC") return;
      changeViewType("CLASSIC");
    },
    [changeViewType, viewType]
  );

  const onPressModern = useCallback(
    (e: PressEvent) => {
      if (viewType === "MODERN") return;
      changeViewType("MODERN");
    },
    [changeViewType, viewType]
  );

  const ViewTypeIcon = useMemo(
    () => (viewType === "MODERN" ? ViewTypeModernIcon : ViewTypeClassicIcon),
    [viewType]
  );

  return (
    <div className="tabs-setting">
      <div className="filter-area">
        <Button
          type="button"
          className="filter-btn"
          aria-label="Toggle feed filter options"
          onPress={onPress}
        >
          <FilterIcon
            className={classNames("icon", {
              active: isFilter,
            })}
          />
        </Button>
      </div>

      <PopoverTrigger
        eleProps={{
          className: "view-type-area",
        }}
        triggerButtonProps={{
          "aria-label": "feed view dropdown",
          className: "view-type-btn",
        }}
        placement="bottom"
        label={
          <>
            <span className="md:mr-2">
              <ViewTypeIcon className="icon-sm" />
            </span>
            <span className="hidden md:block">View</span>
          </>
        }
        isOpen={isViewType}
        onOpenChange={onOpenChange}
      >
        <SimpleDialog className="view-type-menu-popover">
          <div className="container">
            <div>
              <Button
                aria-label="Modern"
                className={classNames({
                  active: viewType === "MODERN",
                })}
                onPress={onPressModern}
              >
                <ViewTypeModernIcon className="icon-sm mr-2" />
                <span>Modern</span>
              </Button>
              <Button
                aria-label="Classic"
                className={classNames({
                  active: viewType === "CLASSIC",
                })}
                onPress={onPressClassic}
              >
                <ViewTypeClassicIcon className="icon-sm mr-2" />
                <span>Classic</span>
              </Button>
            </div>
          </div>
        </SimpleDialog>
      </PopoverTrigger>
    </div>
  );
};

export default TabPostSetting;
