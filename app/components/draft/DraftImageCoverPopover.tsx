import React, { useCallback, useRef, useState, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Icons } from "~/components/shared/Icons";

// utils
import { isEmpty } from "~/utils/assertion";
import { optimizeAnimation } from "~/utils/util";
import {
  scheduleMicrotask,
  getClientHeight,
  getScrollHeight,
  getScrollTop,
  getTargetElement,
} from "~/libs/browser-utils";

// hooks
import { useDrop } from "~/libs/hooks/useDrop";
import { useOptionalSession } from "~/api/user/hooks/useSession";
import { useImageFilesQuery } from "~/api/files/hooks/useImageFilesQuery";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { useImageUploadMutation } from "~/api/files/hooks/useImageUploadMutation";
import { useFormContext } from "react-hook-form";
import {
  Transition,
  UploadStatus,
  useDraftContext,
} from "~/context/useDraftContext";

// types
import type { FormFieldValues } from "~/routes/draft";
import type { FileSchema } from "~/api/schema/file";

function DraftImageCoverPopover() {
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
          <DraftImageCoverPopover.Tabs onChangeOpenState={onChangeOpenState} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default DraftImageCoverPopover;

DraftImageCoverPopover.Tabs = function DraftEdtiorContentTabs({
  onChangeOpenState,
}: {
  onChangeOpenState: (value: boolean) => void;
}) {
  return (
    <Tabs.Root className="horizontal__container" defaultValue="tab1">
      <Tabs.List
        className="tabs__cover outline-none"
        aria-label="Manage your account"
      >
        <Tabs.Trigger className="tab__item" value="tab1">
          <span>Upload</span>
        </Tabs.Trigger>
        <Tabs.Trigger className="tab__item" value="tab2">
          <span>Library</span>
        </Tabs.Trigger>
        <Popover.Close className="popover-close-btn" aria-label="Close">
          <Icons.X className="icon__base fill-current" />
        </Popover.Close>
      </Tabs.List>
      <Tabs.Content className="p-4" value="tab1">
        <DraftImageCoverPopover.TabContentUpload
          onChangeOpenState={onChangeOpenState}
        />
      </Tabs.Content>
      <Tabs.Content className="overflow-auto p-4" value="tab2">
        <DraftImageCoverPopover.TabContentLibrary />
      </Tabs.Content>
    </Tabs.Root>
  );
};

DraftImageCoverPopover.TabContentUpload =
  function DraftEdtiorContentTabContentUpload({
    onChangeOpenState,
  }: {
    onChangeOpenState: (value: boolean) => void;
  }) {
    const { setValue } = useFormContext<FormFieldValues>();

    const { changeTransition, changeUploadStatus } = useDraftContext();

    const $ipt = useRef<HTMLInputElement | null>(null);

    const $container = useRef<HTMLDivElement | null>(null);

    const { isLoading, mutate } = useImageUploadMutation({
      onSuccess(data) {
        const { result } = data.json;

        setValue("thumbnail", result, {
          shouldValidate: true,
          shouldDirty: true,
        });

        onChangeOpenState(false);

        scheduleMicrotask(() => {
          changeUploadStatus(UploadStatus.SUCCESS);
          changeTransition(Transition.UPDATING);
        });
      },
      onError() {
        setValue("thumbnail", null, {
          shouldValidate: true,
          shouldDirty: true,
        });

        changeUploadStatus(UploadStatus.ERROR);
        changeTransition(Transition.IDLE);
      },
    });

    const upload = useCallback(
      async (file: File) => {
        changeUploadStatus(UploadStatus.IDLE);

        changeUploadStatus(UploadStatus.UPLOADING);

        const objectUrl = URL.createObjectURL(file);

        // validation checj file sizes 1600 x 800 px
        const image = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (e) => reject(e);
          img.src = objectUrl;
        });

        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }

        if (image.width > 1600 || image.height > 800) {
          throw new Error("Image size is too small");
        }

        mutate({
          file,
          uploadType: "POST_THUMBNAIL",
          mediaType: "IMAGE",
        });
      },
      [changeUploadStatus, mutate]
    );

    const onClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const $ = getTargetElement($ipt);
        if ($) $.click();
      },
      []
    );

    const onChange = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files || isEmpty(files)) {
          const error = new Error();
          error.name = "No file";
          error.message = "No file";
          throw error;
        }

        const file = files.item(0);
        if (!file) {
          throw new Error("No file");
        }

        await upload(file);
      },
      [upload]
    );

    useDrop($container, {
      onFiles: async (files) => {
        if (!files || isEmpty(files)) {
          const error = new Error();
          error.name = "No file";
          error.message = "No file";
          throw error;
        }

        const file = files.at(0);
        if (!file) {
          throw new Error("No file");
        }

        await upload(file);
      },
    });

    return (
      <div className="tab-content__upload" ref={$container}>
        <button
          type="button"
          className="btn__upload"
          onClick={onClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.Loading className="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-600" />
          ) : (
            <Icons.Upload className="icon__base mr-2 fill-current" />
          )}
          <span className="text-sm font-medium">Upload Image</span>
        </button>
        <input
          type="file"
          className="hidden"
          disabled={isLoading}
          ref={$ipt}
          accept="image/*, image/avif, image/gif, image/jpeg, image/png, image/svg, image/svg+xml, image/webp, image/bmp, image/x, image/tiff, image/vnd, image/xbm"
          onChange={onChange}
        />
        <p className="desc">Recommended dimension is 1600 x 840</p>
      </div>
    );
  };

DraftImageCoverPopover.TabContentLibrary =
  function DraftEdtiorContentTabContentLibrary() {
    const ref = useRef<HTMLDivElement | null>(null);
    const { data, fetchNextPage, hasNextPage } = useImageFilesQuery({
      limit: 4,
    });

    const list = useMemo(() => {
      return data?.pages?.flatMap?.((page) => page.list) ?? [];
    }, [data]);

    const scrollMethod = optimizeAnimation(() => {
      const el = getTargetElement(ref);
      if (!el) {
        return;
      }

      const scrollTop = getScrollTop(el);
      const scrollHeight = getScrollHeight(el);
      const clientHeight = getClientHeight(el);

      if (scrollHeight - scrollTop <= clientHeight + 200 && hasNextPage) {
        fetchNextPage();
      }
    });

    useEventListener("scroll", scrollMethod, { target: ref });

    return (
      <div className="pt-4">
        <div className="h-72 overflow-y-scroll" ref={ref}>
          <div className="grid grid-cols-8 gap-4">
            {list.map((item) => {
              return (
                <DraftImageCoverPopover.LibraryItem
                  item={item}
                  key={`library-item-${item.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

interface DraftEdtiorContentLibraryItemProps {
  item: Omit<FileSchema, "deletedAt">;
}

DraftImageCoverPopover.LibraryItem = function DraftEdtiorContentLibraryItem({
  item,
}: DraftEdtiorContentLibraryItemProps) {
  const session = useOptionalSession();

  const { setValue } = useFormContext<FormFieldValues>();

  const { changeTransition } = useDraftContext();

  const onClickSelect = useCallback(() => {
    setValue("thumbnail", item, {
      shouldValidate: true,
      shouldDirty: true,
    });
    scheduleMicrotask(() => {
      changeTransition(Transition.UPDATING);
    });
  }, [item, changeTransition, setValue]);

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
};
