import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";

// components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icons } from "~/components/shared/Icons";

// hooks
import { useDraftContext } from "~/context/useDraftContext";
import { useNavigate, useParams } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// types
import type { PostDetailRespSchema } from "~/api/schema/resp";

interface MyDraftItemProps {
  item: PostDetailRespSchema;
}

export default function MyDraftItem({ item }: MyDraftItemProps) {
  const { changeDraftId, draftId, toggleSubTitle } = useDraftContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams<{ itemId: string }>();

  const selected = useMemo(() => {
    if (!params.itemId) return false;
    return params.itemId.toString() === item.id.toString();
  }, [item.id, params.itemId]);

  const onSelectedDraft = useCallback(async () => {
    navigate(PAGE_ENDPOINTS.DRAFT.ID(item.id));
  }, [navigate, item.id]);

  const onClickDelete = useCallback(async () => {
    // if (!item.id) return;
    // changeDraftId(undefined);
    // if (item.subTitle) {
    //   toggleSubTitle(false);
    // }
    // await hashnodeDB.deleteDraft(item.id);
  }, [changeDraftId, item.id, item.subTitle, toggleSubTitle]);

  return (
    <div
      aria-selected={selected}
      aria-label="my draft item"
      className={classNames("my-draft-item", {
        active: selected,
      })}
    >
      <button
        className={classNames("my-draft-content w-full", {
          active: selected,
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
          <DropdownMenu.Root open={open} onOpenChange={setOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                type="button"
                className="btn-more"
                aria-label="Customise options"
              >
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
}
