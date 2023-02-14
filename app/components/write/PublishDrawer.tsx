import React from "react";

// hooks
import { useWriteContext } from "~/stores/useWirteContext";
import { useMedia } from "react-use";

import Drawer from "rc-drawer";

// components
import { XIcon } from "~/components/ui/Icon";
import { Button } from "~/components/ui/shared";
import {
  Description,
  DisabledComment,
  IsPublic,
  Schedule,
  TagCombobox,
} from "./_components";

interface PublishDrawerProps {
  onPublich: () => void;
}

const PublishDrawer: React.FC<PublishDrawerProps> = ({ onPublich }) => {
  const { visibility, toggleSetting } = useWriteContext();

  const is768px = useMedia("(min-width: 768px)");

  return (
    <Drawer
      open={visibility.setting}
      placement={is768px ? "right" : "bottom"}
      width={is768px ? "40%" : "100%"}
      onClose={() => toggleSetting(false)}
    >
      <div className="px-4 pt-4 pb-10 md:px-6">
        <div className="relative">
          <div className="flex flex-row items-center justify-between border-b pb-4">
            <Button
              className="mr-2 flex flex-row items-center justify-center rounded-full border border-transparent py-1 px-3 text-center text-base font-medium text-gray-700 outline-none"
              onPress={() => toggleSetting(false)}
            >
              <XIcon className="mr-2 h-5 w-5 fill-current" />
              <span>Close</span>
            </Button>
            <Button
              onPress={onPublich}
              className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
            >
              Publish
            </Button>
          </div>
        </div>
        <TagCombobox />
        <Description />
        <DisabledComment />
        <IsPublic />
        <Schedule />
      </div>
    </Drawer>
  );
};

export default PublishDrawer;
