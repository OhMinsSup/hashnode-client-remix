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
import { useDebounceFn } from "~/libs/hooks/useDebounceFn";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";
import { ASSET_URL } from "~/constants/constant";

// types
import type { FormFieldValues } from "~/routes/_draft";

interface DraftLeftSidebarProps {
  draftComponent: React.JSX.Element;
  searchComponent: React.JSX.Element;
  children: React.ReactNode;
}

export default function DraftLeftSidebar({
  draftComponent,
  searchComponent,
  children,
}: DraftLeftSidebarProps) {
  const { visibility } = useDraftContext();
  return (
    <>
      <div
        className={classNames("draft-sidebar", {
          "!hidden": !visibility.isLeftSidebarVisible,
        })}
        id="draft-sidebar"
        aria-hidden={!visibility.isLeftSidebarVisible}
      >
        <DraftLeftSidebar.Header />
        {searchComponent}
        {draftComponent}
        <DraftLeftSidebar.NewDraft />
      </div>
      {children}
    </>
  );
}

DraftLeftSidebar.Header = function DraftLeftSidebarHeader() {
  const session = useSession();
  const { visibility, toggleLeftSidebar } = useDraftContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  return (
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
  );
};

DraftLeftSidebar.NewDraft = function DraftLeftSidebarNewDraft() {
  const { watch } = useFormContext<FormFieldValues>();

  const fetcher = useFetcher();

  const watchAll = watch();

  const submit = useCallback(
    (data: FormFieldValues) => {
      const input = {
        body: Json.stringify(data),
      };
      fetcher.submit(input, {
        method: "POST",
        replace: true,
      });
    },
    [fetcher]
  );

  const onNewOrSaveDraftClick = useCallback(
    () => submit(watchAll),
    [submit, watchAll]
  );

  return (
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
      {fetcher.data?.dataId && (
        <DraftLeftSidebar.SubscribeUpdateDraft draftId={fetcher.data.dataId} />
      )}
      {!fetcher.data?.dataId && (
        <DraftLeftSidebar.SubscribeNewDraft submit={submit} />
      )}
    </div>
  );
};

DraftLeftSidebar.SubscribeNewDraft = function SubscribeNewDraft({
  submit,
}: {
  submit: (data: FormFieldValues) => void;
}) {
  const { watch } = useFormContext<FormFieldValues>();
  const watchAll = watch();

  const debounced = useDebounceFn(
    (data: FormFieldValues) => {
      submit(data);
    },
    {
      wait: 250,
      trailing: true,
    }
  );

  useDeepCompareEffect(() => {
    debounced.run(watchAll);
  }, [watchAll]);

  return null;
};

DraftLeftSidebar.SubscribeUpdateDraft = function SubscribeUpdateDraft({
  draftId,
}: {
  draftId?: number;
}) {
  const { watch } = useFormContext<FormFieldValues>();

  const watchAll = watch();

  const fetcher = useFetcher();

  const debounced = useDebounceFn(
    (dataId: number, data: FormFieldValues) => {
      const input = {
        body: Json.stringify(data),
        id: dataId.toString(),
      };
      fetcher.submit(input, {
        method: "PUT",
        replace: true,
      });
    },
    {
      wait: 250,
      trailing: true,
    }
  );

  useDeepCompareEffect(() => {
    if (draftId) {
      debounced.run(draftId, watchAll);
    }
  }, [watchAll, draftId]);

  return null;
};
