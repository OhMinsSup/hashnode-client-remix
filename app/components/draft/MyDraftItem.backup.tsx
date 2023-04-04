import React, { useCallback, useState } from "react";
import classNames from "classnames";

// components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icons } from "~/components/shared/Icons";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useDeleteDraftsMutation } from "~/api/drafts/hooks/useDeleteDraftsMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useDraftSidebarContext } from "~/context/useDraftSidebarContext";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import type { DraftSchema } from "~/api/schema/draft";

interface MyDraftItemProps {
  item: DraftSchema;
}

const MyDraftItem: React.FC<MyDraftItemProps> = ({ item }) => {
  const { changeDraftId, draftId } = useDraftContext();
  const [open, setOpen] = useState(false);
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
      className={classNames("my-draft-item", {
        active: draftId ? draftId === item.id : false,
      })}
    >
      <button
        className={classNames("my-draft-content w-full", {
          active: draftId ? draftId === item.id : false,
        })}
        aria-label="my draft item"
        onClick={onSelectedDraft}
      >
        <div className="icon-wrapper">
          <Icons.EmptyFile className="icon__sm mr-2 flex-shrink-0 stroke-current" />
        </div>
        <div className="text">{item.title || "Untitled"}</div>
      </button>
      <div className="my-draft-more">
        <div className="my-draft-more--container">
          <DropdownMenu.Root
            open={open}
            onOpenChange={(open) => {
              setOpen(open);

              if (open) {
                changeDraftId(item.id);
              } else {
                changeDraftId(undefined);
              }
            }}
          >
            <DropdownMenu.Trigger asChild>
              <button className="btn-more" aria-label="Customise options">
                <Icons.EllipsisVertical className="icon__sm stroke-current" />
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
                  <Icons.Trash className="icon__sm mr-2 stroke-current" />
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
