import React, { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Icons } from "~/components/shared/Icons";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// hooks
import { useFetcher, useNavigate, useParams } from "@remix-run/react";

// types
import type { DraftDetailRespSchema } from "~/api/schema/resp";
import type { DraftItemIdTempAction } from "~/routes/draft.action.$itemId.temp";

interface TempDraftItemProps {
  item: DraftDetailRespSchema;
}

export default function TempDraftItem({ item }: TempDraftItemProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const fetcher = useFetcher<DraftItemIdTempAction>();
  const params = useParams<{ itemId: string }>();

  const selected = useMemo(() => {
    if (!params.itemId) return false;
    return params.itemId.toString() === item.id.toString();
  }, [item.id, params.itemId]);

  const onSelectedDraft = useCallback(async () => {
    navigate(PAGE_ENDPOINTS.DRAFT.ID(item.id));
  }, [item.id, navigate]);

  const onClickDelete = useCallback(async () => {
    fetcher.submit(null, {
      method: "DELETE",
      action: `/draft/action/${item.id}/temp`,
      replace: true,
    });
  }, [fetcher, item.id]);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <div
        aria-selected={selected}
        aria-label="write draft item"
        className={classNames("my-draft-item", {
          active: selected,
        })}
      >
        <button
          className={classNames("my-draft-content w-full", {
            active: selected,
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
            <AlertDialog.Trigger asChild>
              <button className="btn-more" aria-label="Customise options">
                <Icons.EllipsisVertical className="icon__sm stroke-current" />
              </button>
            </AlertDialog.Trigger>
          </div>
        </div>
      </div>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 fixed inset-0 data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Delete draft
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mb-5 mt-4 text-[15px] leading-normal">
            Are you sure you want to delete this draft?
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <button
              type="button"
              className="text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              onClick={onClickDelete}
            >
              Delete
            </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
