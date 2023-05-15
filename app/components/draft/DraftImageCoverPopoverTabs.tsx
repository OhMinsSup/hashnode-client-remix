import React from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import { Icons } from "~/components/shared/Icons";

import DraftImageCoverPopoverContentUpload from "./DraftImageCoverPopoverContentUpload";
import DraftImageCoverPopoverLibraryList from "./DraftImageCoverPopoverLibraryList";

interface DraftImageCoverPopoverTabsProps {
  onChangeOpenState: (value: boolean) => void;
}

export default function DraftImageCoverPopoverTabs({
  onChangeOpenState,
}: DraftImageCoverPopoverTabsProps) {
  return (
    <Tabs.Root className="horizontal__container" defaultValue="tab1">
      <Tabs.List
        className="tabs__cover outline-none"
        aria-label="Manage your account"
      >
        <Tabs.Trigger className="tab__item" value="tab1">
          <span>Upload</span>
        </Tabs.Trigger>
        <Tabs.Trigger className="tab__item" value="tab2">
          <span>Library</span>
        </Tabs.Trigger>
        <Popover.Close className="popover-close-btn" aria-label="Close">
          <Icons.X className="icon__base fill-current" />
        </Popover.Close>
      </Tabs.List>
      <Tabs.Content className="p-4" value="tab1">
        <DraftImageCoverPopoverContentUpload
          onChangeOpenState={onChangeOpenState}
        />
      </Tabs.Content>
      <Tabs.Content className="overflow-auto p-4" value="tab2">
        <DraftImageCoverPopoverLibraryList
          onChangeOpenState={onChangeOpenState}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
}
