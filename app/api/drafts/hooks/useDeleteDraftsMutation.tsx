import { useMutation } from "@tanstack/react-query";
import { deleteDraftApi } from "~/api/drafts/drafts";

// constants
import { MUTATIONS_KEY } from "~/constants/constant";

import type { DeleteDraftApiReturnValue } from "~/api/drafts/drafts";
import type {
  MutationFunction,
  UseMutationOptions,
} from "@tanstack/react-query";

interface UseDeleteDraftsMutationOptions
  extends Omit<
    UseMutationOptions<
      DeleteDraftApiReturnValue,
      unknown,
      { id: string | number },
      unknown
    >,
    "mutationKey" | "mutationFn"
  > {}

export function useDeleteDraftsMutation(
  id: string | number,
  options?: UseDeleteDraftsMutationOptions
) {
  const action: MutationFunction<
    DeleteDraftApiReturnValue,
    { id: string | number }
  > = (body) => {
    return deleteDraftApi(body.id);
  };
  return useMutation(MUTATIONS_KEY.DRAFTS.DELETE(id), action, options);
}
