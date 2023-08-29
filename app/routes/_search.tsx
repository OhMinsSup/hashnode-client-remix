import React from "react";
import { Outlet } from "@remix-run/react";
import { SearchLayout } from "~/components/search/future/SearchLayout";
import { MainHeader } from "~/components/shared/future/MainHeader";

export default function Routes() {
  return (
    <SearchLayout header={<MainHeader />}>
      <Outlet />
    </SearchLayout>
  );
}
