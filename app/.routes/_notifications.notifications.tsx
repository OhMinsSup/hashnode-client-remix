import { Outlet } from "@remix-run/react";
import { NotificationsTitle } from "~/components/notifications/future/NotificationsTitle";
import { NotificationsTabs } from "~/components/notifications/future/NotificationsTabs";

export default function Routes() {
  return (
    <>
      <NotificationsTitle />
      <NotificationsTabs>
        <Outlet />
      </NotificationsTabs>
    </>
  );
}
