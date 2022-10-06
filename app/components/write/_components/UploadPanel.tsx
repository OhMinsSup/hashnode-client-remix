import React, { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useImageUploadMutation } from "~/api/files";
import { useWriteStore } from "~/stores/useWriteStore";
import { isEmpty } from "~/utils/assertion";

interface UploadPancelProps {
  onClose: (
    focusableElement?:
      | HTMLElement
      | React.MutableRefObject<HTMLElement | null>
      | undefined
  ) => void;
}

const UploadPanel: React.FC<UploadPancelProps> = ({ onClose }) => {
  const { setValue } = useFormContext();

  const { changeUploadStatus } = useWriteStore();
  const { isLoading, mutateAsync } = useImageUploadMutation();

  const onUploadChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        changeUploadStatus("idle");
        const files = e.target.files;

        if (!files || isEmpty(files)) {
          throw new Error("No file");
        }

        const file = files[0];
        if (!file) {
          throw new Error("No file");
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

        changeUploadStatus("uploading");

        const { result } = await mutateAsync({
          file,
          uploadType: "POST_THUMBNAIL",
          mediaType: "IMAGE",
        });

        setValue("thumbnail", result.result, {
          shouldValidate: true,
          shouldDirty: true,
        });

        onClose();

        changeUploadStatus("success");
      } catch (error) {
        changeUploadStatus("error");
        setValue("thumbnail", null, {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
    },
    [changeUploadStatus, mutateAsync, onClose, setValue]
  );

  return (
    <>
      <div className="mt-8 mb-4 flex flex-row justify-center">
        <label className=" cursor-pointer rounded-lg bg-blue-500 py-3 px-12 text-sm font-bold text-white">
          <span className="text-base font-semibold tracking-wide">
            Choose an image
          </span>
          <input
            type="file"
            disabled={isLoading}
            id="inputUpload"
            hidden
            data-id="upload-cover"
            accept={["image/gif", "image/jpeg", "image/png", "image/webp"].join(
              ","
            )}
            onChange={onUploadChange}
          />
        </label>
      </div>
      <p className="text-center text-sm text-gray-600">
        Recommended dimension is 1600 x 840
      </p>
    </>
  );
};

export default UploadPanel;
