import React from "react";
import { Link, useLoaderData } from "@remix-run/react";

// components
import { AddFileIcon, LeftArrowIcon } from "~/components/ui/Icon";
import MyDraftSidebar from "~/components/draft/MyDraftSidebar";
import MyDraftSearch from "~/components/draft/MyDraftSearch";
import Button from "~/components/ui/shared/Button";

// context
import { DraftSidebarProvider } from "~/context/useDraftSidebarContext";

// utils
import { firstLetterToUpperCase } from "~/utils/util";

interface DraftLeftSidebarProps {}

const DraftLeftSidebar: React.FC<DraftLeftSidebarProps> = () => {
  const { session } = useLoaderData();

  return (
    <DraftSidebarProvider>
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
        <MyDraftSearch />
        <MyDraftSidebar />
        <div className="draft-sidebar-footer">
          <Button className="btn-new-draft" aria-label="new draft button">
            <AddFileIcon className="icon mr-2 !fill-none stroke-current" />
            <span>New draft</span>
          </Button>
        </div>
      </div>
    </DraftSidebarProvider>
  );
};

export default DraftLeftSidebar;
