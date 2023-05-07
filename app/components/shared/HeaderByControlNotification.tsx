import React, { useRef } from "react";

// components
import HeaderNotifications from "~/components/notifications/HeaderNotifications";
import * as Popover from "@radix-ui/react-popover";
import { Icons } from "~/components/shared/Icons";

// hooks
import { useForceUpdate } from "~/libs/hooks/useForceUpdate";

export default function HeaderByControlNotification() {
  const forceUpdate = useForceUpdate();

  const $notify = useRef<HTMLDivElement | null>(null);
  return (
    <div
      className="notification"
      ref={(ref) => {
        if (!$notify.current) {
          $notify.current = ref;
          forceUpdate();
        }
      }}
    >
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="btn__notification"
            type="button"
            aria-label="Notifications"
          >
            <Icons.Notification className="icon__md stroke-current" />
            <span className="notification__count">1</span>
          </button>
        </Popover.Trigger>
        <Popover.Portal container={$notify.current}>
          <Popover.Content className="popover__notification" sideOffset={5}>
            <HeaderNotifications />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
