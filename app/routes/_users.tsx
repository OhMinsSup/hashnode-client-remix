import React from "react";
import { Outlet } from "@remix-run/react";
import { UsersLayout } from "~/components/users/future/UsersLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";

export default function Routes() {
  return (
    <UsersLayout header={<MainHeader />}>
      <Outlet />
    </UsersLayout>
  );
}
