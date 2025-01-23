import { createQuery } from "@tanstack/solid-query";
import { Accessor } from "solid-js";
import {
  GetPalletStockItemQuery,
  GetPalletStockItemDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useGetPalletStockItem = (
  palletId: Accessor<string>,
  options = {}
) => {
  return createQuery<GetPalletStockItemQuery | null>(() => {
    return {
      queryKey: ["productLocations", palletId],
      queryFn: async () => {
        if (!palletId) return null;
        const response = await gqlClient.request<GetPalletStockItemQuery>(
          GetPalletStockItemDocument,
          { id: palletId }
        );
        return response;
      },
      enabled: !!palletId,
      ...options,
      // onSuccess: (data: GetPalletStockItemQuery | null) => {
      //   console.log("Query success:", data);
      // },
      // onError: (error: Error) => {
      //   console.error("Query error:", error);
      // },
    };
  });
};
