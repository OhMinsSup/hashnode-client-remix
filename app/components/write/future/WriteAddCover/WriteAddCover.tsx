import React, { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import * as Popover from "@radix-ui/react-popover";
import * as Tabs from "@radix-ui/react-tabs";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { useWriteContext } from "~/context/useWriteContext";
import { useFetcher } from "@remix-run/react";
import { getTargetElement } from "~/libs/browser-utils";
import { isEmpty } from "~/utils/assertion";
import { useDrop } from "~/libs/hooks/useDrop";
import { Icons } from "~/components/shared/Icons";
import { getPath } from "~/routes/_action._protected.action.upload";

import type { Action } from "~/routes/_action._protected.action.upload";
import { useWriteFormContext } from "../../context/form";

export default function WriteAddCover() {
  const { isCoverOpen, setCoverOpen, setCoverClose, uploadState } =
    useWriteContext();

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setCoverOpen();
      } else {
        setCoverClose();
      }
    },
    [setCoverClose, setCoverOpen]
  );

  return (
    <Popover.Root open={isCoverOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(styles.btn_add_cover, {
            "!hidden": uploadState === "success",
          })}
        >
          {uploadState === "pending" ? (
            <>
              <svg className="!mr-1 animate-spin" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
              </svg>
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <svg fill="none" viewBox="0 0 24 24">
                <path
                  d="M17.8828 11.0741L13.8013 16.0424L10.1085 12.0823L5.699 16.504M14.1999 8.08994C14.1999 8.31085 14.0208 8.48994 13.7999 8.48994C13.579 8.48994 13.3999 8.31085 13.3999 8.08994M14.1999 8.08994C14.1999 7.86902 14.0208 7.68994 13.7999 7.68994C13.579 7.68994 13.3999 7.86902 13.3999 8.08994M14.1999 8.08994H13.3999M6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span>Add Cover</span>
            </>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={styles.popover__content} align="start">
          <Tabs.Root className={styles.popover__container} defaultValue="tab1">
            <Tabs.List
              className={cn(styles.tab_list, "outline-none")}
              aria-label="Manage your account"
            >
              <Tabs.Trigger className={styles.tab_active} value="tab1">
                <span>Upload</span>
              </Tabs.Trigger>
              <Tabs.Trigger className={styles.tab} value="tab2">
                <span>Library</span>
              </Tabs.Trigger>
              <Popover.Close
                className={styles.popover__close}
                aria-label="Close"
              >
                <svg viewBox="0 0 320 512">
                  <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
                </svg>
              </Popover.Close>
            </Tabs.List>
            <Tabs.Content className="p-4" value="tab1">
              <WriteAddCover.Upload />
            </Tabs.Content>
            <Tabs.Content className="overflow-auto px-4" value="tab2">
              <WriteAddCover.Library />
            </Tabs.Content>
          </Tabs.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

WriteAddCover.Upload = function Item() {
  const fetcher = useFetcher<Action>();

  const { setUploadState, uploadState, setCoverClose } = useWriteContext();

  const { setValue } = useWriteFormContext();

  const $ipt = useRef<HTMLInputElement | null>(null);

  const $container = useRef<HTMLDivElement | null>(null);

  const upload = useCallback(
    async (file: File) => {
      console.log("upload ====>", file);
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
      if (uploadState === "pending") return;

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

  useEffect(() => {
    const fetcherData = fetcher.data;
    console.log("fetcherData ====>", fetcherData);
    if (fetcher.state === "idle" && fetcherData != null) {
      const result = fetcherData.result;
      if (result && fetcherData.success) {
        setCoverClose();
        setUploadState("success");
        // @ts-ignore TODO: fix this
        const { id, publicUrl } = result;
        setValue("thumbnail", {
          id,
          url: publicUrl,
        });
      } else {
        setUploadState("idle");
        setValue("thumbnail", undefined);
      }
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <div className={styles.tab_content_upload} ref={$container}>
      <button
        type="button"
        className={styles.btn_upload}
        onClick={onClick}
        disabled={uploadState === "pending"}
      >
        {uploadState === "pending" ? (
          <Icons.Loading className="-ml-1 mr-3 h-5 w-5 animate-spin text-blue-600" />
        ) : (
          <svg
            className="css-pbhbmr"
            viewBox="0 0 15 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.25281 3.00282C7.38844 2.86501 7.61156 2.86501 7.74719 3.00282L9.49719 4.75282C9.635 4.88844 9.635 5.11157 9.49719 5.24719C9.36156 5.38501 9.13844 5.38501 9.00281 5.24719L7.85 4.09438V7.45001C7.85 7.64251 7.6925 7.80001 7.5 7.80001C7.3075 7.80001 7.15 7.64251 7.15 7.45001V4.09438L5.99719 5.24719C5.86156 5.38501 5.63844 5.38501 5.50281 5.24719C5.365 5.11157 5.365 4.88844 5.50281 4.75282L7.25281 3.00282ZM6.45 0.100006C7.75156 0.100006 8.90219 0.746412 9.6 1.73626C9.91719 1.58466 10.2737 1.50001 10.65 1.50001C12.0041 1.50001 13.1 2.59594 13.1 3.95001C13.1 4.18407 13.0672 4.38969 13.0059 4.62376C13.8941 5.09188 14.5 6.02594 14.5 7.10001C14.5 8.64657 13.2466 9.90001 11.7 9.90001H3.65C1.91028 9.90001 0.5 8.48907 0.5 6.75001C0.5 5.37626 1.37828 4.21032 2.60372 3.77719C2.69406 1.73188 4.38063 0.100006 6.45 0.100006ZM6.45 0.800006C4.75688 0.800006 3.37656 2.13438 3.30219 3.80782C3.29125 4.09438 3.10531 4.32407 2.83625 4.43782C1.88206 4.77469 1.2 5.68251 1.2 6.75001C1.2 8.10407 2.29681 9.20001 3.65 9.20001H11.7C12.8594 9.20001 13.8 8.25938 13.8 7.10001C13.8 6.29501 13.3472 5.59501 12.68 5.24282C12.3869 5.06782 12.2425 4.74844 12.3322 4.41157C12.3759 4.27813 12.4 4.11844 12.4 3.95001C12.4 2.98313 11.6169 2.20001 10.65 2.20001C10.3809 2.20001 10.1272 2.26126 9.89969 2.36844C9.59344 2.51501 9.22375 2.41657 9.02687 2.13876C8.45594 1.32763 7.51531 0.800006 6.45 0.800006Z"></path>
          </svg>
        )}
        <span>Upload Image</span>
      </button>
      <input
        type="file"
        id="inputUpload"
        data-id="upload-cover"
        accept="image/jpeg, image/png, image/webp, image/gif, image/svg+xml"
        className="hidden"
        ref={$ipt}
        disabled={uploadState === "pending"}
        onChange={onChange}
      ></input>
      <p className={styles.recommended_text}>
        Recommended dimension is 1600 x 840
      </p>
    </div>
  );
};

WriteAddCover.Library = function Item() {
  return (
    <div className="pt-4">
      <label htmlFor="unsplash-search" className={styles.search_input_label}>
        <div className="relative w-full">
          <input
            id="unsplash-search"
            type="text"
            autoComplete="off"
            placeholder="Type something and press enter"
            className={styles.ipt_search}
            value=""
          />
          <svg
            className={styles.ipt_search_icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15.8091 15.8091M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <button
            disabled
            type="button"
            aria-label="Clear image search"
            className={styles.btn_search_ipt_reset}
          >
            <svg className="css-12cnxdc" viewBox="0 0 320 512">
              <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
            </svg>
          </button>
        </div>
        <button type="button" className={styles.btn_search}>
          Search
        </button>
      </label>
      <div className="h-72">
        <div className="grid gap-4 md:grid-cols-9">
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
          <WriteAddCover.LibraryCard />
        </div>
      </div>
    </div>
  );
};

WriteAddCover.LibraryCard = function Item() {
  return (
    <div className="cursor-pointer rounded-lg col-span-4 md:col-span-3">
      <button className={styles.card}>
        <AspectRatio.Root ratio={16 / 9}>
          <img
            className="h-full w-full"
            src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
            alt="Landscape photograph by Tobias Tullius"
          />
        </AspectRatio.Root>
      </button>
      <p className={styles.card_desc}>
        by{" "}
        <span>
          <a
            href="https://unsplash.com/@andrewtneel?utm_source=Hashnode&amp;utm_medium=referral"
            rel="noopener nofollow noreferrer"
            target="_blank"
            className="font-semibold"
          >
            Andrew Neel
          </a>
        </span>
      </p>
    </div>
  );
};
