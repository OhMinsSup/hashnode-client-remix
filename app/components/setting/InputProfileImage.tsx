import React, { useCallback, useMemo } from "react";
import ErrorMessage from "../shared/ErrorMessage";

// components
import { Icons } from "../shared/Icons";

// hooks
import { useNavigation } from "@remix-run/react";
import { useFormContext } from "react-hook-form";
import { useImageUploadMutation } from "~/api/files/hooks/useImageUploadMutation";

import type { FormFieldValues } from "services/validate/user-update-api.validate";

interface ProfileImageProps {}

export default function InputProfileImage(props: ProfileImageProps) {
  const { setValue, watch, formState } = useFormContext<FormFieldValues>();

  const navigation = useNavigation();

  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  const { isLoading, mutate } = useImageUploadMutation({
    onSuccess: (data) => {
      const { result } = data.json;
      setValue("avatarUrl", result.url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    onError: () => {
      setValue("avatarUrl", undefined, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
  });

  const onImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) {
        throw new Error("No file selected");
      }

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
        uploadType: "PROFILE",
        mediaType: "IMAGE",
      });
    },
    [mutate]
  );

  const onImageDelete = useCallback(() => {
    setValue("avatarUrl", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue]);

  const watchAvatarUrl = watch("avatarUrl");

  return (
    <>
      <label htmlFor="customFile" className="input-label">
        Profile Photo
      </label>
      {isLoading && <InputProfileImage.Loading />}
      {!isLoading && watchAvatarUrl && (
        <InputProfileImage.Success
          url={watchAvatarUrl}
          onDelete={onImageDelete}
        />
      )}
      {!isLoading && !watchAvatarUrl && (
        <InputProfileImage.Pending onChange={onImageUpload} />
      )}
      <ErrorMessage
        isSubmitting={isSubmitting}
        errors={formState.errors}
        name="avatarUrl"
      />
    </>
  );
}

interface PendingProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

InputProfileImage.Pending = function Pending(props: PendingProps) {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange?.(event);
    },
    [props]
  );

  return (
    <label className="input-upload" id="customFile">
      <Icons.Cloud className="h-10 w-10 fill-current" />
      <span className="mt-2 text-xs font-semibold leading-normal">
        Upload Photo
      </span>
      <input
        type="file"
        accept=".png, .jpg, .jpeg, .gif"
        className="hidden"
        id="customFile"
        onChange={onChange}
      />
    </label>
  );
};

InputProfileImage.Loading = function Loading() {
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
  url: string;
  onDelete?: () => void;
}

InputProfileImage.Success = function Success({ url, onDelete }: SuccessProps) {
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
