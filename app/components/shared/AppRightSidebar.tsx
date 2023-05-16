import React from "react";
import { useOptionalSession } from "~/api/user/hooks/useSession";
import AppRightWidgetForTreningPost from "./AppRightSidebarWidgetForTreningPost";
import AppRightSidebarWidgetForBookmarks from "./AppRightSidebarWidgetForBookmarks";
import AppRightSidebarContentBox from "./AppRightSidebarContentBox";

export default function AppRightSidebar() {
  const session = useOptionalSession();
  return (
    <aside className="main__right-sidebar">
      <div className="right-sidebar__container">
        <AppRightWidgetForTreningPost />
        {session ? <AppRightSidebarWidgetForBookmarks /> : null}
        <AppRightSidebarContentBox title="Others">??</AppRightSidebarContentBox>
      </div>
    </aside>
  );
}
