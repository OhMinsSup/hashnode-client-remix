import React from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { LeftArrowIcon } from "~/components/ui/Icon";
import MyDraftSidebar from "~/components/draft/MyDraftSidebar";
import { firstLetterToUpperCase } from "~/utils/util";

interface DraftLeftSidebarProps {}

const DraftLeftSidebar: React.FC<DraftLeftSidebarProps> = () => {
  const { session } = useLoaderData();

  return (
    <div className="draft-sidebar">
      <div className="draft-sidebar-header">
        <div className="sidebar-header__btn-back">
          <Link to="/">
            <LeftArrowIcon className="icon-sm flex-shrink-0" />
          </Link>
        </div>
        <div className="sidebar-header__title">
          <div className="sidebar-header__title-container">
            <div className="sidebar-header__title-icon">
              <div className="relative h-8 w-full">
                <img src="/images/logo.png" alt="logo" className="icon-sm" />
              </div>
            </div>
            <div className="sidebar-header__title-text">
              <span className="text-ellipsis">
                {firstLetterToUpperCase(session?.username)} Blog
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="draf-sidebar-search">검색</div>
      <MyDraftSidebar />
      <div className="draft-sidebar-footer">Footer</div>
    </div>
  );
};

export default DraftLeftSidebar;
