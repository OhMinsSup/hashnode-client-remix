import { Outlet } from "@remix-run/react";
import { SearchInput } from "~/components/search/future/SearchInput";
import { SearchTabs } from "~/components/search/future/SearchTabs";

export default function Routes() {
  return (
    <>
      <SearchInput />
      <SearchTabs>
        <Outlet />
      </SearchTabs>
    </>
  );
}
