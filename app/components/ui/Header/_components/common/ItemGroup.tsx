import React, { useMemo, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

// hooks
import { useUserQuery } from "~/api/user/hooks/hook";
import { ASSET_URL } from "~/constants/constant";
import { useIsomorphicLayoutEffect } from "react-use";

// data
import { Serialize } from "~/libs/serialize/serialize";

// components
import { DraftIcon, MoonIcon, NotificationIcon } from "../../../Icon";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { optimizeAnimation } from "~/utils/util";
import { getTargetElement, isBrowser } from "~/libs/browser-utils";

// type
import type { Nullable } from "~/api/schema/api";

interface ItemGroupProps {}

interface AbsolutePosition {
  top: number;
  left: number;
}

interface UserMenuProps {
  avatarUrl: string;
  open: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ avatarUrl, open }) => {
  const [postion, setPosition] = useState<Nullable<AbsolutePosition>>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const handleResize = optimizeAnimation(() => {
    const target = getTargetElement(panelRef);
    if (!target) return;
    const children = target.firstElementChild;
    if (!children) return;
    const childrenWidth = children.clientWidth + 2;
    const innerWidth = window.innerWidth;
    const left = innerWidth - childrenWidth - 24;
    const top = 71;
    setPosition({
      left,
      top,
    });
  });

  useEventListener("resize", handleResize, {
    passive: true,
  });

  useIsomorphicLayoutEffect(() => {
    if (isBrowser) {
      handleResize();
    }

    return () => {
      setPosition(null);
    };
  }, [open]);

  return (
    <>
      <Popover.Button
        className="block h-full w-full overflow-hidden rounded-full bg-gray-300"
        ref={buttonRef}
      >
        <div className="relative block h-10 w-full rounded-full bg-gray-100">
          <img
            className="lazyload blur-up rounded-full"
            data-src={avatarUrl}
            alt="Profile"
          />
        </div>
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          ref={panelRef}
          className="absolute z-50"
          style={{ ...(postion ? postion : {}) }}
        >
          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
            <div className=" relative min-h-[2rem] min-w-[4rem] bg-white">
              <div className="w-[18rem]">
                <div className=" relative flex w-[36rem] rounded-lg transition-all duration-150">
                  <section>Hemi</section>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

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
          {/* <span className="absolute right-[-0.25rem] top-[-0.25rem] rounded-full bg-red-500 px-2 font-bold text-white">
            1
          </span> */}
        </button>
      </div>

      <Popover className="mr-2 h-10 w-10 flex-shrink-0">
        {({ open }) => <UserMenu avatarUrl={avatarUrl} open={open} />}
      </Popover>
    </div>
  );
};

export default ItemGroup;
