import React, { useCallback, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Icons } from "~/components/shared/Icons";
import DraftImageCoverPopoverTabs from "./DraftImageCoverPopoverTabs";

// hooks
import { useFormContext } from "react-hook-form";
import { UploadStatus, useDraftContext } from "~/context/useDraftContext";

// types
import type { FormFieldValues } from "~/routes/_draft";

export default function DraftImageCoverPopover() {
  const [open, setOpen] = useState(false);

  const { watch } = useFormContext<FormFieldValues>();

  const { upload } = useDraftContext();

  const watchThumbnail = watch("thumbnail");

  const onChangeOpenState = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  if (watchThumbnail) {
    return null;
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button type="button" className="btn-toolbar">
          {upload.status === UploadStatus.UPLOADING ? (
            <Icons.Uploading className="icon__base mr-2 animate-spin fill-current" />
          ) : (
            <Icons.Media className="icon__base mr-2 stroke-current" />
          )}
          <span>Add Cover</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal className="popover__cover-portal">
        <Popover.Content className="popover__cover" sideOffset={5}>
          <DraftImageCoverPopoverTabs onChangeOpenState={onChangeOpenState} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
