import React, { useCallback } from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";

// hooks
import { useOptionalSession } from "~/api/user/hooks/useSession";
import { useFormContext } from "react-hook-form";

// types
import type { FormFieldValues } from "~/routes/draft";
import type { FileSchema } from "~/api/schema/file";

interface DraftImageCoverPopoverLibraryItemProps {
  item: Omit<FileSchema, "deletedAt">;
  onChangeOpenState: (value: boolean) => void;
}

export default function DraftImageCoverPopoverLibraryItem({
  item,
  onChangeOpenState,
}: DraftImageCoverPopoverLibraryItemProps) {
  const session = useOptionalSession();

  const { setValue } = useFormContext<FormFieldValues>();

  const onClickSelect = useCallback(() => {
    setValue("thumbnail", item, {
      shouldValidate: true,
      shouldDirty: true,
    });
    onChangeOpenState(false);
  }, [item, setValue, onChangeOpenState]);

  return (
    <div className="col-span-4 cursor-pointer rounded-lg">
      <button
        onClick={onClickSelect}
        type="button"
        className="w-full overflow-hidden rounded-lg border outline-none"
      >
        <AspectRatio.Root ratio={16 / 9}>
          <img
            className="h-full w-full"
            src={item.url}
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio.Root>
      </button>
      <p className="mt-1 text-sm text-slate-700">
        by
        <span className="ml-1 font-semibold">{session?.username}</span>
      </p>
    </div>
  );
}
