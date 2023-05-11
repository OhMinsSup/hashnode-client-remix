import { useMutation } from "@tanstack/react-query";
import { uploadApi } from "~/api/files/upload";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type { UploadBody } from "../validation/upload";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";
import type { BaseResponse } from "~/api/client.next";
import type { UploadRespSchema } from "~/api/schema/resp";

export type ReturnValue = {
  json: BaseResponse<UploadRespSchema>;
};

interface UseImageUploadMutationOptions
  extends Omit<
    UseMutationOptions<ReturnValue, unknown, UploadBody, unknown>,
    "mutationKey" | "mutationFn"
  > {}

export function useImageUploadMutation(
  options?: UseImageUploadMutationOptions
) {
  const action: MutationFunction<ReturnValue, UploadBody> = (body) => {
    return uploadApi(body);
  };
  return useMutation([MUTATIONS_KEY.FILES.UPLOAD], action, options);
}
