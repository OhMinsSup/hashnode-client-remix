import React, { useCallback, useMemo } from "react";
import styles from "./styles.module.css";

// hooks
import { useFetcher } from "@remix-run/react";
import { useSettingUserFormContext } from "~/components/setting/context/form";
import { Icons } from "~/components/shared/Icons";
import { getPath } from "~/routes/_action._protected.action.upload";

import type { Action } from "~/routes/_action._protected.action.upload";
import { isUndefined } from "~/utils/assertion";
import { useDeepCompareEffect } from "~/libs/hooks/useDeepCompareEffect";

export default function SettingProfileImage() {
  const fetcher = useFetcher<Action>();
  const { setValue, watch } = useSettingUserFormContext();

  const image = watch("image");

  const isInitImage = useMemo(() => {
    return image && isUndefined(image.id) && image.url;
  }, [image]);

  const isIdle = useMemo(
    () => fetcher.state === "idle" && fetcher.data == null,
    [fetcher]
  );

  const isLoading = useMemo(
    () => fetcher.state === "loading" || fetcher.state === "submitting",
    [fetcher]
  );

  const isSuccess = useMemo(
    () => fetcher.state === "idle" && fetcher.data != null,
    [fetcher]
  );

  const onImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploadType", "PROFILE");
      formData.append("mediaType", "IMAGE");

      fetcher.submit(formData, {
        method: "POST",
        action: getPath(location.pathname),
        encType: "multipart/form-data",
      });
    },
    [fetcher]
  );

  const onImageDelete = useCallback(() => {
    if (!isInitImage) {
      fetcher.submit(
        {},
        {
          method: "POST",
          action: getPath(location.pathname),
          encType: "multipart/form-data",
        }
      );
    }
    setValue("image", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [fetcher, setValue, isInitImage]);

  return (
    <>
      <label htmlFor="file" className="input-label">
        Profile Photo
      </label>
      {isIdle && isInitImage ? (
        <SettingProfileImage.Success
          data={{
            id: undefined,
            publicUrl: image?.url as unknown as string,
          }}
          mode="init"
          onDelete={onImageDelete}
        />
      ) : null}
      {isIdle && !isInitImage ? (
        <SettingProfileImage.Pending onChange={onImageUpload} />
      ) : null}
      {isLoading ? <SettingProfileImage.Loading /> : null}
      {isSuccess ? (
        <SettingProfileImage.Success
          data={{
            id: fetcher.data?.id as unknown as string,
            publicUrl: fetcher.data?.publicUrl as unknown as string,
          }}
          mode="update"
          onDelete={onImageDelete}
        />
      ) : null}
    </>
  );
}

interface PendingProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

SettingProfileImage.Pending = function Item(props: PendingProps) {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(event);
    },
    [props]
  );

  return (
    <label className={styles.upload_pending}>
      <Icons.Cloud className="h-10 w-10 fill-current" />
      <span className="mt-2 text-xs font-semibold leading-normal">
        Upload Photo
      </span>
      <input
        type="file"
        accept="image/avif, image/gif, image/jpeg, image/png, image/webp, image/bmp, image/x, image/tiff, image/vnd, image/xbm"
        className="hidden"
        id="file"
        onChange={onChange}
      />
    </label>
  );
};

SettingProfileImage.Loading = function Item() {
  return (
    <label className="custom-file flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-full border bg-white uppercase tracking-wide text-slate-500 shadow">
      <svg className="h-16 w-16 animate-spin fill-current" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
      </svg>
    </label>
  );
};

interface SuccessProps {
  mode: "update" | "init";
  data: {
    id: string | undefined;
    publicUrl: string;
  };
  onDelete?: () => void;
}

SettingProfileImage.Success = function Item({
  data,
  onDelete,
  mode,
}: SuccessProps) {
  const { setValue, watch } = useSettingUserFormContext();

  const image = watch("image");

  useDeepCompareEffect(() => {
    if (data && mode === "update") {
      setValue(
        "image",
        {
          id: data.id,
          url: data.publicUrl,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
  }, [data]);

  return (
    <div className="relative block h-40 w-40 rounded-full bg-slate-100 shadow-xl">
      <a
        className="block overflow-hidden rounded-full"
        href={image?.url}
        target="_blank"
        rel="noreferrer"
      >
        <img className="block" src={image?.url} alt="empty" />
      </a>
      <button
        type="button"
        onClick={onDelete}
        className="absolute right-0 top-0 z-10 rounded-full border bg-white p-2 text-slate-700"
      >
        <Icons.Trash className="h-4 w-4 stroke-current" />
      </button>
    </div>
  );
};
