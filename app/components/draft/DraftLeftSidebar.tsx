import React, { useCallback } from "react";
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
import { scheduleMicrotask } from "~/libs/browser-utils";

// hooks
import { useFormContext } from "react-hook-form";
import { useSaveDraftsMutation } from "~/api/drafts/hooks/useSaveDraftsMutation";
import { useNewDraftsMutation } from "~/api/drafts/hooks/useNewDraftsMutation";
import { Transition, useDraftContext } from "~/context/useDraftContext";

// types
import type { FormFieldValues } from "~/routes/__draft";
import classNames from "classnames";

interface DraftLeftSidebarProps {}

const DraftLeftSidebar: React.FC<DraftLeftSidebarProps> = () => {
  const { session } = useLoaderData();

  const { watch } = useFormContext<FormFieldValues>();

  const { draftId, changeDraftId, changeTransition, visibility } =
    useDraftContext();

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

  return (
    <DraftSidebarProvider>
      <div
        className={classNames("draft-sidebar", {
          hidden: !visibility.isLeftSidebarVisible,
        })}
        id="draft-sidebar"
        aria-hidden={!visibility.isLeftSidebarVisible}
      >
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
          <Button
            className="btn-new-draft"
            aria-label="new draft button"
            onPress={onNewOrSaveDraftClick}
            isDisabled={mutation_save.isLoading || mutation_new.isLoading}
          >
            <AddFileIcon className="icon mr-2 !fill-none stroke-current" />
            <span>New draft</span>
          </Button>
        </div>
      </div>
    </DraftSidebarProvider>
  );
};

export default DraftLeftSidebar;
