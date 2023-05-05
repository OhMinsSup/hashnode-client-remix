import { useMutation } from "@tanstack/react-query";
import { uploadApi } from "~/api/files/upload";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type { ImageUploadApiReturnValue } from "~/api/files/upload";
import type { UploadBody } from "../validation/upload";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseImageUploadMutationOptions
  extends Omit<
    UseMutationOptions<ImageUploadApiReturnValue, unknown, UploadBody, unknown>,
    "mutationKey" | "mutationFn"
  > {}

export function useImageUploadMutation(
  options?: UseImageUploadMutationOptions
) {
  const action: MutationFunction<ImageUploadApiReturnValue, UploadBody> = (
    body
  ) => {
    return uploadApi(body);
  };
  return useMutation([MUTATIONS_KEY.FILES.UPLOAD], action, options);
}
