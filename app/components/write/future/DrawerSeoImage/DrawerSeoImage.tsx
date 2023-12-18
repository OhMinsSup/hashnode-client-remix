import React, { useCallback, useRef } from "react";
import styles from "./styles.module.css";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useFetcher } from "@remix-run/react";
import { getPath as getUploadPath } from "~/routes/_action._protected.action.upload";
import { useWriteFormContext } from "../../context/form";
import { isEmpty } from "~/utils/assertion";
import { useDrop } from "~/libs/hooks/useDrop";
import { cn } from "~/utils/util";

import type { Action } from "~/routes/_action._protected.action.upload";

export default function DrawerSeoImage() {
  const fetcher = useFetcher<Action>();

  const { setValue } = useWriteFormContext();

  const onImageUpload = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadType", "IMAGE");
      formData.append("mediaType", "IMAGE");
      fetcher.submit(formData, {
        method: "POST",
        action: getUploadPath(location.pathname),
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
        action: getUploadPath(location.pathname),
        encType: "multipart/form-data",
      }
    );
    setValue("seo.image", {
      id: undefined,
      url: undefined,
    });
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
            // @ts-ignore TODO: fix this
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
        <div className={styles.seo_image_alert}>
          <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
            <path
              stroke="currentColor"
              d="M4 16.742A4.5 4.5 0 0 1 6.08 8.52a6.002 6.002 0 0 1 11.84 0A4.5 4.5 0 0 1 20 16.742M12 11v9m0-9 3 3m-3-3-3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
          </svg>
          <span className={styles.txt_01}>Click to upload image</span>
          <span className={styles.txt_02}>
            Recommended dimension: 1200 x 630 px
          </span>
        </div>
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
      <div className={cn(styles.seo_image, "absolute inset-0")}>
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
      <div className="absolute inset-0">
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
            className="rounded w-full h-full object-cover"
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
