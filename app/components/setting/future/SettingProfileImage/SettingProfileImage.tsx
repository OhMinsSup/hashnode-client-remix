import React, { useCallback, useEffect } from "react";
import styles from "./styles.module.css";

// hooks
import { useFetcher } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { Icons } from "~/components/shared/Icons";
import { getPath } from "~/routes/_action._protected.action.upload";

import type { FormFieldValues } from "services/validate/user-update-api.validate";
import type { Action } from "~/routes/_action._protected.action.upload";

interface SettingProfileImageProps {}

export default function SettingProfileImage(props: SettingProfileImageProps) {
  const fetcher = useFetcher<Action>();
  const { setValue } = useFormContext<FormFieldValues>();

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
        action: getPath(),
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
        action: getPath(),
        encType: "multipart/form-data",
      }
    );
    setValue("avatarUrl", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [fetcher, setValue]);

  return (
    <>
      <label htmlFor="file" className="input-label">
        Profile Photo
      </label>
      {fetcher.state === "idle" && fetcher.data == null ? (
        <SettingProfileImage.Pending onChange={onImageUpload} />
      ) : null}
      {fetcher.state === "loading" || fetcher.state === "submitting" ? (
        <SettingProfileImage.Loading />
      ) : null}
      {fetcher.state === "idle" && fetcher.data != null ? (
        <SettingProfileImage.Success
          urls={fetcher.data.result?.variants ?? []}
          onDelete={onImageDelete}
        />
      ) : null}
    </>
  );
}

interface PendingProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

SettingProfileImage.Pending = function Pending(props: PendingProps) {
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

SettingProfileImage.Loading = function Loading() {
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
  urls: string[];
  onDelete?: () => void;
}

SettingProfileImage.Success = function Success({
  urls,
  onDelete,
}: SuccessProps) {
  const { setValue, watch } = useFormContext<FormFieldValues>();

  const url = watch("avatarUrl");

  useEffect(() => {
    const first = urls.at(0);
    if (first) {
      setValue("avatarUrl", first, { shouldValidate: true, shouldDirty: true });
    }
  }, [urls]);

  return (
    <div className="relative block h-40 w-40 rounded-full bg-slate-100 shadow-xl">
      <a
        className="block overflow-hidden rounded-full"
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <img className="block" src={url} alt="empty" />
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
