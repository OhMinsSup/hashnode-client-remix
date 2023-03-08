import { useMutation } from "@tanstack/react-query";
import { postNewDraftApi } from "~/api/drafts/drafts";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type {
  NewDraftApiBody,
  NewDraftApiReturnValue,
} from "~/api/drafts/drafts";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseSaveDraftsMutationOptions
  extends Omit<
    UseMutationOptions<
      NewDraftApiReturnValue,
      unknown,
      NewDraftApiBody,
      unknown
    >,
    "mutationKey" | "mutationFn"
  > {}

export function useNewDraftsMutation(options?: UseSaveDraftsMutationOptions) {
  const action: MutationFunction<NewDraftApiReturnValue, NewDraftApiBody> = (
    body
  ) => {
    return postNewDraftApi(body);
  };
  return useMutation([MUTATIONS_KEY.DRAFTS.SAVE_DRAFTS], action, options);
}
