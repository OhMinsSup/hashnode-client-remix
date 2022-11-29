import React, { useMemo } from "react";

// hooks
import { useUserQuery } from "~/api/user/user";
import { ASSET_URL } from "~/constants/constant";

// data
import { Serialize } from "~/libs/serialize/serialize";

// components
import { DraftIcon, MoonIcon, NotificationIcon } from "../../../Icon";

interface ItemGroupProps {}

const ItemGroup: React.FC<ItemGroupProps> = () => {
  const { data } = useUserQuery();

  const profile = useMemo(() => {
    return Serialize.default({
      data,
    });
  }, [data]);

  const avatarUrl = useMemo(() => {
    return profile?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [profile]);

  return (
    <div className="flex flex-row items-center justify-end">
      {profile && (
        <div className="relative mr-2 h-10 w-10 md:block">
          <button
            type="button"
            aria-label="changelog"
            className=" relative flex h-full w-full flex-row items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 2xl:mr-2"
          >
            <DraftIcon className="h-6 w-6 fill-current" />
          </button>
        </div>
      )}
      <button className="ransition-transform relative mr-2 flex h-10 w-10 flex-row items-center justify-center rounded-full text-gray-700 duration-300">
        <MoonIcon className="h-6 w-6 fill-current" />
      </button>
      {profile && (
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
      )}
      <div className="mr-2 h-10 w-10 flex-shrink-0">
        <button
          className="block h-full w-full overflow-hidden rounded-full bg-gray-300"
          type="button"
          aria-label="Profile Dropdown"
        >
          <div className="relative block h-10 w-full rounded-full bg-gray-100">
            <img
              className="lazyload blur-up rounded-full"
              data-src={avatarUrl}
              alt="Profile"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ItemGroup;
