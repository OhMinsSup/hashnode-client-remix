import React, { useCallback, useTransition } from "react";
import { Link } from "@remix-run/react";
import classNames from "classnames";

// components
import { Icons } from "~/components/shared/Icons";

// utils
import { firstLetterToUpperCase } from "~/utils/util";

// hooks
import { useFormContext } from "react-hook-form";
import { useDraftContext } from "~/context/useDraftContext";
import { hashnodeDB } from "~/libs/db/db";
import { useSession } from "~/api/user/hooks/useSession";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { ASSET_URL } from "~/constants/constant";

// types
import type { FormFieldValues } from "~/routes/draft";

interface DraftLeftSidebarProps {
  myDrafts: React.JSX.Element;
  writeDraft: React.JSX.Element;
}

export default function DraftLeftSidebar({
  myDrafts,
  writeDraft,
}: DraftLeftSidebarProps) {
  const session = useSession();

  const { watch } = useFormContext<FormFieldValues>();

  const [isPending, startTransition] = useTransition();

  const { draftId, visibility, toggleLeftSidebar } = useDraftContext();

  const { keyword, changeKeyword } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  const onNewOrSaveDraftClick = useCallback(async () => {
    const input = watch();

    startTransition(() => {
      if (!draftId) {
        hashnodeDB.addDraft(input);
      } else {
        hashnodeDB.updateDraft(draftId, input);
      }
    });
  }, [draftId, watch]);

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      changeKeyword(e.target.value);
    },
    [changeKeyword]
  );

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
      <div className="draft-sidebar-search">
        <input
          type="search"
          value={keyword}
          className="input-seach"
          aria-label="Search drafts"
          placeholder="Search drafts…"
          onChange={onChangeKeyword}
        />
        <span className="input-search--icon">
          <Icons.Search className="icon__sm" />
        </span>
      </div>
      {myDrafts}
      {writeDraft}
      <div className="draft-sidebar-footer">
        <button
          type="button"
          className="btn-new-draft"
          aria-label="new draft button"
          onClick={onNewOrSaveDraftClick}
          disabled={isPending}
        >
          <Icons.AddFile className="icon__base mr-2 stroke-current" />
          <span>New draft</span>
        </button>
      </div>
    </div>
  );
};

