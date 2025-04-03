import { createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import {
  GetMallProductDetailPagesQuery,
  GetMallProductDetailPagesDocument,
  GetMallProductDetailPagesQueryVariables,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useGetMallProductDetailPages = (
  initialVariables: GetMallProductDetailPagesQueryVariables
) => {
  const [variables, setVariables] =
    createSignal<GetMallProductDetailPagesQueryVariables>(initialVariables);

  const query = createQuery(() => ({
    queryKey: ["getMallProductDetailPages", variables()],
    queryFn: async () => {
      const response = await gqlClient.request<GetMallProductDetailPagesQuery>(
        GetMallProductDetailPagesDocument,
        variables()
      );
      return response;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    cacheTime: 1000 * 60 * 10, // 10분 동안 캐시 보존
  }));

  const fetchMore = async (
    newVariables: Partial<GetMallProductDetailPagesQueryVariables>
  ) => {
    const updatedVariables = {
      ...variables(),
      ...newVariables,
    };
    setVariables(updatedVariables);

    // Force refetch with new variables
    return await query.refetch();
  };

  return {
    ...query,
    fetchMore,
    variables,
    setVariables,
  };
};
