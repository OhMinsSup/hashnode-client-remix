import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

// hooks
import { useAuthStore } from "~/stores/useAuthStore";

// constants
import { QUERIES_KEY } from "~/constants/constant";

// types
import { getUserInfoApi } from "../user";

import type { AppAPI } from "~/api/schema/api";
import type { UserRespSchema } from "~/api/schema/resp";

interface UserReturnValue {
  result: AppAPI<UserRespSchema>;
}

export function useUserQuery(
  options?: Omit<
    UseQueryOptions<UserReturnValue, any, UserReturnValue, string[]>,
    "queryKey" | "queryFn"
  >
) {
  const { isLoggedIn } = useAuthStore();

  const defaultOptions = {
    enabled: isLoggedIn,
  };

  const opts: typeof options = {
    ...defaultOptions,
    ...options,
    // 1시간
    staleTime: 1000 * 60 * 60,
    // 24시간
    cacheTime: 1000 * 60 * 60 * 24,
  };

  const resp = useQuery(QUERIES_KEY.ME, (_key) => getUserInfoApi(), opts);
  return resp;
}
