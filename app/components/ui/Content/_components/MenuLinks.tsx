import React from "react";
import SidebarNavLink from "./SidebarNavLink";
import { ExploreIcon, BookmarkIcon, FeedIcon, TempIcon } from "../../Icon";

const MenuLinks = () => {
  return (
    <>
      <SidebarNavLink
        text="My Feed"
        to="/stories"
        end
        icon={
          <FeedIcon className=" flex-shrink-0 fill-current lg:mr-2 lg:h-5 lg:w-5" />
        }
      />
      <SidebarNavLink
        text="Explore"
        to="/stories/explore"
        icon={
          <ExploreIcon className=" flex-shrink-0 fill-current lg:mr-2 lg:h-5 lg:w-5" />
        }
      />
      <SidebarNavLink
        text="Drafts"
        to="/stories/drafts"
        icon={
          <TempIcon className=" flex-shrink-0 fill-current lg:mr-2 lg:h-5 lg:w-5" />
        }
      />
      <SidebarNavLink
        text="Bookmarks"
        to="/stories/bookmarks"
        icon={
          <BookmarkIcon className=" flex-shrink-0 fill-current lg:mr-2 lg:h-5 lg:w-5" />
        }
      />
    </>
  );
};

export default MenuLinks;
