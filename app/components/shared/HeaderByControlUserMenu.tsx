import React, { useRef } from "react";

// components
import * as Popover from "@radix-ui/react-popover";
import HeaderUserMenu from "~/components/shared/HeaderUserMenu";

// hooks
import { useForceUpdate } from "~/libs/hooks/useForceUpdate";
import { ASSET_URL } from "~/constants/constant";

export default function HeaderByControlUserMenu() {
  const forceUpdate = useForceUpdate();

  const $menu = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="menu"
      ref={(ref) => {
        if (!$menu.current) {
          $menu.current = ref;
          forceUpdate();
        }
      }}
    >
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="btn__profile"
            type="button"
            aria-label="Profile Dropdown"
          >
            <div className="img__container">
              <img src={ASSET_URL.DEFAULT_AVATAR} alt="profile" />
            </div>
          </button>
        </Popover.Trigger>
        <Popover.Portal container={$menu.current}>
          <Popover.Content className="popover__menu" sideOffset={5}>
            <HeaderUserMenu />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
