import { useMutation } from "@tanstack/react-query";
import { postImageUploadApi } from "~/api/files/files";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type {
  ImageUploadApiReturnValue,
  PostImageUploadApiBody,
} from "~/api/files/files";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseImageUploadMutationOptions
  extends Omit<
    UseMutationOptions<
      ImageUploadApiReturnValue,
      unknown,
      PostImageUploadApiBody,
      unknown
    >,
    "mutationKey" | "mutationFn"
  > {}

export function useImageUploadMutation(
  options?: UseImageUploadMutationOptions
) {
  const action: MutationFunction<
    ImageUploadApiReturnValue,
    PostImageUploadApiBody
  > = (body) => {
    return postImageUploadApi(body);
  };
  return useMutation([MUTATIONS_KEY.FILES.UPLOAD], action, options);
}
