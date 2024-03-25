import { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export default function useQueryClient() {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
    []
  );

  return {
    queryClient,
  };
}
