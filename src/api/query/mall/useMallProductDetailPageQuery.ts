import { createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import {
  MallProductDetailPageDocument,
  MallProductDetailPageQuery,
} from "~/generated/graphql";

import { gqlClient } from "~/lib/graphql-client";

export const useMallProductDetailPageQuery = (initialVariables: {
  id: string;
}) => {
  const [variables, setVariables] = createSignal<{ id: string }>(
    initialVariables
  );

  const query = createQuery(() => ({
    queryKey: ["mallProductDetailPage", variables().id],
    queryFn: async () => {
      if (!variables().id) return { mallProductDetailPage: null };
      
      try {
        return await gqlClient.request<MallProductDetailPageQuery>(
          MallProductDetailPageDocument,
          { id: variables().id }
        );
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
      }
    },
    enabled: !!variables().id,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 보존
    retry: 1,
    suspense: false,
    refetchOnWindowFocus: false,
  }));

  return {
    ...query,
    variables,
    setVariables,
  };
};
