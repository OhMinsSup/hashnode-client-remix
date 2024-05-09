import React, { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { useWriteContext } from "~/components/write/context/useWriteContext";
import { useFetcher } from "@remix-run/react";
import { type RoutesActionData, getPath } from "~/routes/api.v1.assets.upload";
import { getTargetElement } from "~/libs/browser-utils";
import { useDrop } from "~/libs/hooks/useDrop";

export default function ImageUpload() {
  const $ipt = useRef<HTMLInputElement | null>(null);

  const $container = useRef<HTMLDivElement | null>(null);

  const { setUploadState, uploadState, setCoverClose } = useWriteContext();

  const fetcher = useFetcher<RoutesActionData>();

  console.log(fetcher);

  const upload = useCallback(
    async (file: File) => {
      setUploadState("pending");
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

      if (image.width > 1600 || image.height > 840) {
        alert("Image size is too small");
        setUploadState("idle");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadType", "POST_THUMBNAIL");
      formData.append("mediaType", "IMAGE");

      fetcher.submit(formData, {
        method: "POST",
        action: getPath(),
        encType: "multipart/form-data",
      });
    },
    [setUploadState, fetcher]
  );

  const onClick = useCallback(() => {
    const $ = getTargetElement($ipt);
    if ($) $.click();
  }, []);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) {
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
      if (uploadState === "pending") {
        return;
      }

      if (!files) {
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

  useEffect(() => {
    const fetcherData = fetcher.data;
    if (fetcher.state === "idle" && fetcherData != null) {
      setCoverClose();
      setUploadState("success");
      console.log(fetcherData);
      //   setValue("thumbnail", {
      //     id: fetcherData.id,
      //     url: fetcherData.publicUrl,
      //   });
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className={styles.tab_content_upload} ref={$container}>
      <Button
        type="button"
        variant="outline"
        className="space-x-2"
        onClick={onClick}
        disabled={uploadState === "pending"}
      >
        {uploadState === "pending" ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <Icons.cloudUpload />
        )}
        <span>Upload Image</span>
      </Button>
      <input
        type="file"
        id="inputUpload"
        data-id="upload-cover"
        accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
        className="hidden"
        ref={$ipt}
        disabled={uploadState === "pending"}
        onChange={onChange}
      />
      <p className={styles.recommended_text}>
        Recommended dimension is 1600 x 840
      </p>
    </div>
  );
}