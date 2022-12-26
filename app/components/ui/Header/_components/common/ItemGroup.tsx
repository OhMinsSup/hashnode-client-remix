import React, { useMemo, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

// hooks
import { ASSET_URL } from "~/constants/constant";
import { useIsomorphicLayoutEffect } from "react-use";
import { useAuthStore } from "~/stores/useAuthStore";

// components
import { Link } from "@remix-run/react";
import {
  DraftIcon,
  MoonIcon,
  NotificationIcon,
  TempIcon,
  UserIcon,
  BookmarkIcon,
  LogoutIcon,
} from "~/components/ui/Icon";
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
  open: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ open }) => {
  const { currentProfile } = useAuthStore();

  const avatarUrl = useMemo(() => {
    return currentProfile?.profile?.avatarUrl ?? ASSET_URL.DEFAULT_AVATAR;
  }, [currentProfile]);

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
              {/* w-[36rem] */}
              {currentProfile ? (
                <div className="w-[18rem]">
                  <div className="relative flex rounded-lg transition-all duration-150">
                    <section className="flex flex-1 flex-col">
                      {/* Header */}
                      <Link
                        to="/"
                        className="flex max-w-[18rem] flex-row items-center p-6"
                      >
                        <div className=" mr-4 h-14 w-14 flex-shrink-0 rounded-full">
                          <div className=" relative block h-full w-full rounded-full bg-gray-100">
                            <img
                              className="lazyload blur-up"
                              data-src={avatarUrl}
                              alt="Profile"
                            />
                          </div>
                        </div>
                        <div
                          className=" min-w-0 flex-1"
                          style={{ lineHeight: 1.25 }}
                        >
                          <h2
                            title="OhMinSup"
                            className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-gray-900"
                          >
                            {currentProfile?.username}
                          </h2>
                          <p className=" overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
                            @{currentProfile?.profile?.name}
                          </p>
                        </div>
                      </Link>
                      <hr className=" mx-6 h-[1px] flex-1" />
                      {/* Header */}
                      {/* Link */}
                      <Link
                        to="/"
                        className="flex flex-row items-center py-4 px-6 font-semibold text-gray-900"
                      >
                        <TempIcon className="mr-2 h-6 w-6 fill-current" />
                        <span>My Drafts</span>
                      </Link>
                      <Link
                        to="/"
                        className="flex flex-row items-center py-4 px-6 font-semibold text-gray-900"
                      >
                        <BookmarkIcon className="mr-2 h-6 w-6 fill-current" />
                        <span>My Bookmarks</span>
                      </Link>
                      <Link
                        to="/"
                        className="flex flex-row items-center py-4 px-6 font-semibold text-gray-900"
                      >
                        <UserIcon className="mr-2 h-6 w-6 fill-current" />
                        <span>Account Settings</span>
                      </Link>
                      <hr className=" mx-6 h-[1px] flex-1" />
                      <Link
                        to="/"
                        className="flex flex-row items-center py-4 px-6 font-semibold text-red-500"
                      >
                        <LogoutIcon className="mr-2 h-6 w-6 fill-current" />
                        <span>Log out</span>
                      </Link>
                      {/* Link */}
                    </section>
                  </div>
                </div>
              ) : (
                <div
                  className="h-auto w-[16rem] p-6 md:w-[18rem]"
                  style={{ lineHeight: "1.375" }}
                >
                  <div className="mx-auto mb-5 block h-24 w-24">
                    <img
                      className="lazyload blur-up"
                      data-src={ASSET_URL.DEFAULT_AVATAR}
                      alt="Profile"
                    />
                  </div>
                  <h1 className="mb-4 text-2xl font-extrabold text-gray-900">
                    Sign up or log in to your Hashnode account.
                  </h1>
                  <p className="mb-4 text-base text-gray-700">
                    Takes less than a few seconds.
                  </p>
                  <div className="css-o2d6zf">
                    <Link
                      to="/auth/signin"
                      className="ml-2 flex flex-row items-center justify-center rounded-full border border-blue-500 bg-blue-500 py-1 px-3 text-center text-lg font-semibold text-white outline-none hover:shadow-md"
                    >
                      <span>Sign in</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </>
  );
};

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
          {/* <span className="absolute right-[-0.25rem] top-[-0.25rem] rounded-full bg-red-500 px-2 font-bold text-white">
            1
          </span> */}
        </button>
      </div>

      <Popover className="mr-2 h-10 w-10 flex-shrink-0">
        {({ open }) => <UserMenu open={open} />}
      </Popover>
    </div>
  );
};

export default ItemGroup;
