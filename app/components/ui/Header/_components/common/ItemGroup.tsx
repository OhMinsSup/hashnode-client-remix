import React from "react";
import { DraftIcon, MoonIcon, NotificationIcon } from "../../../Icon";

interface ItemGroupProps {}

const ItemGroup: React.FC<ItemGroupProps> = () => {
  return (
    <div className="flex flex-row items-center justify-end">
      <div className="relative mr-2 h-10 w-10 md:block">
        <button
          type="button"
          aria-label="changelog"
          className=" relative flex h-full w-full flex-row items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 2xl:mr-2"
        >
          <DraftIcon className="h-6 w-6 fill-current" />
        </button>
      </div>
      <button className="ransition-transform relative mr-2 flex h-10 w-10 flex-row items-center justify-center rounded-full text-gray-700 duration-300">
        <MoonIcon className="h-6 w-6 fill-current" />
      </button>
      <div className="mr-2 h-10 w-10 md:block">
        <button
          className=" relative flex h-full w-full flex-row items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 2xl:mr-2"
          type="button"
          aria-label="Notifications"
        >
          <NotificationIcon className="h-6 w-6 fill-current" />
          <span className="absolute right-[-0.25rem] top-[-0.25rem] rounded-full bg-red-500 px-2 font-bold text-white">
            1
          </span>
        </button>
      </div>
      <div className="h-10 w-10 flex-shrink-0">
        <button
          className="block h-full w-full overflow-hidden rounded-full bg-gray-300"
          type="button"
          aria-label="Profile Dropdown"
        >
          <div className="relative block h-10 w-full rounded-full bg-gray-100">
            <img
              className="rounded-full"
              src="https://cdn.hashnode.com/res/hashnode/image/upload/v1643707955500/qDAyv6PK_.png"
              alt="Profile"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ItemGroup;
