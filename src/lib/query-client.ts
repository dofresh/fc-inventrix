// src/lib/query-client.ts
import { QueryClient } from "@tanstack/solid-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      suspense: true,
      // 여기에 experimental_prefetchInRender 옵션 추가
      experimental_prefetchInRender: true,
    },
  },
});
