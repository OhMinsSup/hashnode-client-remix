import React, { useCallback } from "react";
import classNames from "classnames";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useDeleteDraftsMutation } from "~/api/drafts/hooks/useDeleteDraftsMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";

// components
import { TrashIcon } from "@heroicons/react/solid";
import { EllipsisVerticalIcon, EmptyFileIcon } from "~/components/__ui/Icon";
import Button from "~/components/__ui/shared/Button";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { DraftSchema } from "~/api/schema/draft";

interface MyDraftItemProps {
  item: DraftSchema;
}

const MyDraftItem: React.FC<MyDraftItemProps> = ({ item }) => {
  const { changeDraftId, draftId } = useDraftContext();
  const { keyword } = useDraftSidebarContext();

  const queryClient = useQueryClient();

  const mutation = useDeleteDraftsMutation(item.id, {
    onSuccess: () => {
      // 리스트 쿼리를 다시 불러옴
      queryClient.invalidateQueries(QUERIES_KEY.DRAFTS.ROOT(keyword));
      // 현재 선택한 아이템이 삭제하는 아이템과 같다면 draftId를 undefined로 변경
      if (draftId === item.id) {
        changeDraftId(undefined);
      }
    },
  });

  const onSelectedDraft = useCallback(() => {
    changeDraftId(item.id);
  }, [changeDraftId, item.id]);

  const onClickDelete = useCallback(() => {
    mutation.mutate({
      id: item.id,
    });
  }, [item.id, mutation]);

  return (
    <div
      aria-selected={
        draftId ? (draftId === item.id ? "true" : "false") : "false"
      }
      aria-label="my draft item"
      className="my-draft-item"
    >
      <Button
        className={classNames("my-draft-content", {
          active: draftId ? draftId === item.id : false,
        })}
        aria-label="my draft item"
        onPress={onSelectedDraft}
      >
        <div className="icon-wrapper">
          <EmptyFileIcon className="icon mr-2 flex-shrink-0 !fill-none stroke-current" />
        </div>
        <div className="text">{item.title || "Untitled"}</div>
      </Button>
      <div className="my-draft-more">
        <div className="my-draft-more--container">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="btn-more" aria-label="Customise options">
                <EllipsisVerticalIcon className="icon" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="dropdown-menu-content--my-draft"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  role="button"
                  aria-label="my draft item delete"
                  className="dropdown-menu-item--my-draft"
                  onClick={onClickDelete}
                >
                  <TrashIcon className="icon mr-2 !stroke-current" />
                  <span>Delete</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default MyDraftItem;
