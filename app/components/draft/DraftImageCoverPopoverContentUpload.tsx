import React, { useCallback, useRef } from "react";
import { Icons } from "~/components/shared/Icons";

// utils
import { isEmpty } from "~/utils/assertion";
import { scheduleMicrotask, getTargetElement } from "~/libs/browser-utils";

// hooks
import { useDrop } from "~/libs/hooks/useDrop";
import { useImageUploadMutation } from "~/api/files/hooks/useImageUploadMutation";
import { useFormContext } from "react-hook-form";
import {
  Transition,
  UploadStatus,
  useDraftContext,
} from "~/context/useDraftContext";

// types
import type { FormFieldValues } from "~/routes/draft";

interface DraftImageCoverPopoverContentUploadProps {
  onChangeOpenState: (value: boolean) => void;
}

export default function DraftImageCoverPopoverContentUpload({
  onChangeOpenState,
}: DraftImageCoverPopoverContentUploadProps) {
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
}
