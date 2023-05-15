import React, { useCallback, useState } from "react";
import classNames from "classnames";

// components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useNavigate } from "@remix-run/react";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface WriteDraftItemProps {
  item: PostDetailRespSchema;
}

export default function WriteDraftItem({ item }: WriteDraftItemProps) {
  const { changeDraftId, draftId, toggleSubTitle } = useDraftContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onSelectedDraft = useCallback(async () => {
    navigate(PAGE_ENDPOINTS.DRAFT.ID(item.id));
  }, [item.id, navigate]);

  const onClickDelete = useCallback(async () => {
    if (!item.id) return;
    changeDraftId(undefined);
    if (item.subTitle) {
      toggleSubTitle(false);
    }
  }, [changeDraftId, item.id, item.subTitle, toggleSubTitle]);

  return (
    <div
      aria-selected={
        draftId ? (draftId === item.id ? "true" : "false") : "false"
      }
      aria-label="write draft item"
      className={classNames("my-draft-item", {
        active: draftId ? draftId === item.id : false,
      })}
    >
      <button
        className={classNames("my-draft-content w-full", {
          active: draftId ? draftId === item.id : false,
        })}
        aria-label="write draft item"
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
