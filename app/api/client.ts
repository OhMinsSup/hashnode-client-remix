import { QueryClient } from "@tanstack/react-query";

export const globalClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
