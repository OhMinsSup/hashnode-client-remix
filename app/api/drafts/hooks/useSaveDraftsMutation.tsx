import { useMutation } from "@tanstack/react-query";
import { postSaveDraftApi } from "~/api/drafts/drafts";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type {
  SaveDraftApiBody,
  SaveDraftApiReturnValue,
} from "~/api/drafts/drafts";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseSaveDraftsMutationOptions
  extends Omit<
    UseMutationOptions<
      SaveDraftApiReturnValue,
      unknown,
      SaveDraftApiBody,
      unknown
    >,
    "mutationKey" | "mutationFn"
  > {}

export function useSaveDraftsMutation(options?: UseSaveDraftsMutationOptions) {
  const action: MutationFunction<SaveDraftApiReturnValue, SaveDraftApiBody> = (
    body
  ) => {
    return postSaveDraftApi(body);
  };
  return useMutation([MUTATIONS_KEY.DRAFTS.SAVE_DRAFTS], action, options);
}
