import { Outlet } from "@remix-run/react";
import { NotificationsLayout } from "~/components/notifications/future/NotificationsLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";

export default function Routes() {
  return (
    <NotificationsLayout header={<MainHeader />}>
      <Outlet />
    </NotificationsLayout>
  );
}
