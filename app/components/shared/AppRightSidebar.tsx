import React from "react";
import { useOptionalSession } from "~/api/user/hooks/useSession";
import AppRightWidgetForTreningPost from "./AppRightWidgetForTreningPost";
import AppRightWidgetForBookmarks from "./AppRightWidgetForBookmarks";
import AppRightSidebarContentBox from "./AppRightSidebarContentBox";

export default function AppRightSidebar() {
  const session = useOptionalSession();
  return (
    <aside className="main__right-sidebar">
      <div className="right-sidebar__container">
        <AppRightWidgetForTreningPost />
        {session ? <AppRightWidgetForBookmarks /> : null}
        <AppRightSidebarContentBox title="Others">??</AppRightSidebarContentBox>
      </div>
    </aside>
  );
}
