import React, { useCallback } from "react";
import { Link, useFetcher } from "@remix-run/react";
import classNames from "classnames";
import Json from "superjson";

// components
import { Icons } from "~/components/shared/Icons";

// utils
import { firstLetterToUpperCase } from "~/utils/util";

// hooks
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { useSession } from "~/api/user/hooks/useSession";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { ASSET_URL } from "~/constants/constant";

// types
import type { FormFieldValues } from "~/routes/_draft";

interface DraftLeftSidebarProps {
  myDraft: React.JSX.Element;
  tempDraft: React.JSX.Element;
  searchInput: React.JSX.Element;
}

export default function DraftLeftSidebar({
  myDraft,
  tempDraft,
  searchInput,
}: DraftLeftSidebarProps) {
  const session = useSession();

  const { watch } = useFormContext<FormFieldValues>();

  const fetcher = useFetcher();
  const { visibility, toggleLeftSidebar } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  const onNewOrSaveDraftClick = useCallback(async () => {
    fetcher.submit(
      {
        body: Json.stringify(watch()),
      },
      {
        method: "POST",
        action: "/draft/action/temp",
        replace: true,
      }
    );
  }, [fetcher, watch]);

  return (
    <div
      className={classNames("draft-sidebar", {
        "!hidden": !visibility.isLeftSidebarVisible,
      })}
      id="draft-sidebar"
      aria-hidden={!visibility.isLeftSidebarVisible}
    >
      <div className="draft-sidebar-header">
        <div className="sidebar-header__btn-back mr-2">
          <Link to={PAGE_ENDPOINTS.ROOT} className="btn-back__icon" replace>
            <Icons.ArrowLeft className="icon__sm flex-shrink-0 stroke-current" />
          </Link>
        </div>
        <div className="sidebar-header__title">
          <div className="sidebar-header__title-container">
            <div className="sidebar-header__title-icon">
              <div className="relative h-8 w-full">
                <img src={ASSET_URL.LOGO} alt="logo" className="ico__sm" />
              </div>
            </div>
            <div className="sidebar-header__title-text">
              <span className="text-ellipsis">
                {firstLetterToUpperCase(session?.username)} Blog
              </span>
            </div>
          </div>
        </div>
        <div className="ml-2 md:hidden">
          <button
            type="button"
            aria-label="close sidebar button"
            aria-expanded={visibility.isLeftSidebarVisible}
            className="sidebar-header__btn-close"
            onClick={onToggleLeftSidebar}
          >
            <Icons.X className="icon__base flex-shrink-0 fill-current" />
          </button>
        </div>
      </div>
      {searchInput}
      {myDraft}
      {tempDraft}
      <div className="draft-sidebar-footer">
        <button
          type="button"
          className="btn-new-draft"
          aria-label="new draft button"
          onClick={onNewOrSaveDraftClick}
          disabled={fetcher.state === "submitting"}
        >
          <Icons.AddFile className="icon__base mr-2 stroke-current" />
          <span>New draft</span>
        </button>
      </div>
    </div>
  );
}
