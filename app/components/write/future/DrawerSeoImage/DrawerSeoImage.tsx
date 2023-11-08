import React, { useCallback, useRef } from "react";
import styles from "./styles.module.css";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useFetcher } from "@remix-run/react";
import {
  type Action as UploadAction,
  getPath as getUploadPath,
} from "~/routes/_action._protected.action.upload";
import { useWriteFormContext } from "../../context/form";
import { isEmpty } from "~/utils/assertion";
import { useDrop } from "~/libs/hooks/useDrop";
import { cn } from "~/utils/util";

export default function DrawerSeoImage() {
  const fetcher = useFetcher<UploadAction>();

  const { setValue } = useWriteFormContext();

  const onImageUpload = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadType", "IMAGE");
      formData.append("mediaType", "IMAGE");
      fetcher.submit(formData, {
        method: "POST",
        action: getUploadPath(),
        encType: "multipart/form-data",
      });
    },
    [fetcher]
  );

  const onImageDelete = useCallback(() => {
    fetcher.submit(
      {},
      {
        method: "POST",
        action: getUploadPath(),
        encType: "multipart/form-data",
      }
    );
    setValue("seo.image", undefined);
  }, [fetcher, setValue]);

  return (
    <div>
      <div>
        {fetcher.state === "idle" && fetcher.data == null ? (
          <DrawerSeoImage.Upload onImageUpload={onImageUpload} />
        ) : null}
        {fetcher.state === "loading" || fetcher.state === "submitting" ? (
          <DrawerSeoImage.Loading />
        ) : null}
        {fetcher.state === "idle" && fetcher.data != null ? (
          <DrawerSeoImage.Success
            urls={fetcher.data.result?.publicUrl ?? []}
            onImageDelete={onImageDelete}
          />
        ) : null}
      </div>
    </div>
  );
}

interface UploadProps {
  onImageUpload: (file: File) => Promise<void>;
}

DrawerSeoImage.Upload = function Item({ onImageUpload }: UploadProps) {
  const $ipt = useRef<HTMLInputElement | null>(null);

  const $container = useRef<HTMLLabelElement | null>(null);

  const upload = useCallback(
    async (file: File) => {
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

      if (image.width > 1200 || image.height > 630) {
        alert("Image size is too small");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadType", "POST_THUMBNAIL");
      formData.append("mediaType", "IMAGE");

      onImageUpload(file);
    },
    [onImageUpload]
  );

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || isEmpty(files)) {
        alert("No file");
        return;
      }

      const file = files.item(0);
      if (!file) {
        alert("No file");
        return;
      }

      await upload(file);
    },
    [upload]
  );

  useDrop($container, {
    onFiles: async (files) => {
      if (!files || isEmpty(files)) {
        alert("No file");
        return;
      }

      const file = files.at(0);
      if (!file) {
        alert("No file");
        return;
      }
      await upload(file);
    },
  });

  return (
    <AspectRatio.Root ratio={16 / 9}>
      <label className={styles.seo_image} ref={$container}>
        <svg viewBox="0 0 512 512">
          <path d="M122.6 155.1 240 51.63V368c0 8.844 7.156 16 16 16s16-7.156 16-16V51.63l117.4 104.3c3 2.77 6.8 4.07 10.6 4.07 4.406 0 8.812-1.812 11.97-5.375 5.875-6.594 5.25-16.72-1.344-22.58l-144-128a15.949 15.949 0 0 0-21.25 0l-144 128C94.78 137.9 94.16 148 100 154.6s16.1 7.2 22.6.5zM448 320H336c-8.836 0-16 7.162-16 16 0 8.836 7.164 16 16 16h112c17.67 0 32 14.33 32 32v64c0 17.67-14.33 32-32 32H64c-17.67 0-32-14.33-32-32v-64c0-17.67 14.33-32 32-32h112c8.8 0 16-7.2 16-16s-7.2-16-16-16H64c-35.35 0-64 28.65-64 64v64c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64v-64c0-35.3-28.7-64-64-64zm-8 96c0-13.25-10.75-24-24-24s-24 10.75-24 24 10.75 24 24 24 24-10.7 24-24z"></path>
        </svg>
        <span>Upload Image</span>
        <input
          name="ogImage"
          type="file"
          id="inputUpload"
          ref={$ipt}
          accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
          className={styles.ipt_upload}
          onChange={onChange}
        />
      </label>
    </AspectRatio.Root>
  );
};

DrawerSeoImage.Loading = function Item() {
  return (
    <AspectRatio.Root ratio={16 / 9}>
      <div className={cn(styles.seo_image_loading, "absolute inset-0")}>
        <svg className="animate-spin" viewBox="0 0 576 512">
          <path d="M288 16c0-8.836 7.2-16 16-16 141.4 0 256 114.6 256 256 0 46.6-12.5 90.4-34.3 128-4.4 7.7-14.2 10.3-21.8 5.9-7.7-4.5-10.3-14.2-5.9-21.9 19.1-32.9 30-71.2 30-112 0-123.7-100.3-224-224-224-8.8 0-16-7.16-16-16z"></path>
        </svg>
      </div>
    </AspectRatio.Root>
  );
};

interface SuccessProps {
  urls: string[];
  onImageDelete: () => void;
}

DrawerSeoImage.Success = function Item({ urls, onImageDelete }: SuccessProps) {
  const url = urls.at(0);
  return (
    <AspectRatio.Root ratio={16 / 9}>
      <div className=" absolute inset-0">
        <a
          href={url}
          target="_blank"
          aria-label="cover-image"
          className=" relative block w-full h-full"
          rel="noreferrer"
        >
          <img
            src={url}
            alt="homepage illustrations"
            decoding="async"
            className="rounded"
          />
        </a>
        <button
          type="button"
          className={styles.btn_seo_image_delete}
          onClick={onImageDelete}
        >
          <svg viewBox="0 0 320 512">
            <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
          </svg>
        </button>
      </div>
    </AspectRatio.Root>
  );
};
