import React, { useCallback, useRef, useState, useTransition } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import classNames from "classnames";

// components
import MyDraftSidebar from "~/components/draft/MyDraftSidebar";
import { Icons } from "~/components/shared/Icons";

// utils
import { firstLetterToUpperCase } from "~/utils/util";
import { scheduleMicrotask } from "~/libs/browser-utils";

// hooks
import { useFormContext } from "react-hook-form";
import { useSaveDraftsMutation } from "~/api/drafts/hooks/useSaveDraftsMutation";
import { useNewDraftsMutation } from "~/api/drafts/hooks/useNewDraftsMutation";
import { Transition, useDraftContext } from "~/context/useDraftContext";
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";

// types
import type { FormFieldValues } from "~/routes/__draft";

interface DraftLeftSidebarProps {}

const DraftLeftSidebar: React.FC<DraftLeftSidebarProps> = () => {
  const { session } = useLoaderData();

  const { watch } = useFormContext<FormFieldValues>();

  const {
    draftId,
    changeDraftId,
    changeTransition,
    visibility,
    toggleLeftSidebar,
  } = useDraftContext();

  const [isPending, startTransition] = useTransition();

  const { keyword, changeKeyword } = useDraftSidebarContext();

  const onToggleLeftSidebar = useCallback(() => {
    toggleLeftSidebar(!visibility.isLeftSidebarVisible);
  }, [toggleLeftSidebar, visibility.isLeftSidebarVisible]);

  const mutation_save = useSaveDraftsMutation({
    onSuccess: (data) => {
      const {
        result: { dataId },
      } = data.result;
      changeDraftId(dataId);
      changeTransition(Transition.DONE);
    },
    onSettled: () => {
      scheduleMicrotask(() => changeTransition(Transition.IDLE));
    },
  });

  const mutation_new = useNewDraftsMutation({
    onSuccess: (data) => {
      const {
        result: { dataId },
      } = data.result;
      changeDraftId(dataId);
      changeTransition(Transition.DONE);
    },
    onSettled: () => {
      scheduleMicrotask(() => changeTransition(Transition.IDLE));
    },
  });

  const onNewOrSaveDraftClick = useCallback(async () => {
    const input = watch();
    const body = {
      ...input,
      thumbnail: input.thumbnail ? input.thumbnail.url : undefined,
      ...(draftId && { draftId }),
    };

    if (!draftId) {
      return mutation_new.mutateAsync(body);
    }
    return mutation_save.mutateAsync(body);
  }, [draftId, mutation_new, mutation_save, watch]);

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => {
        changeKeyword(e.target.value);
      });
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
          <Link to="/" className="btn-back__icon" replace>
            <Icons.ArrowLeft className="icon__sm flex-shrink-0 stroke-current" />
          </Link>
        </div>
        <div className="sidebar-header__title">
          <div className="sidebar-header__title-container">
            <div className="sidebar-header__title-icon">
              <div className="relative h-8 w-full">
                <img src="/images/logo.png" alt="logo" className="ico__sm" />
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

      <MyDraftSidebar />

      <div className="draft-sidebar-footer">
        <button
          type="button"
          className="btn-new-draft"
          aria-label="new draft button"
          onClick={onNewOrSaveDraftClick}
          disabled={mutation_save.isLoading || mutation_new.isLoading}
        >
          <Icons.AddFile className="icon__base mr-2 stroke-current" />
          <span>New draft</span>
        </button>
      </div>
    </div>
  );
};

export default DraftLeftSidebar;
