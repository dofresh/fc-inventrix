// src/api/mutations/stockItems/useDeleteStockItem.ts
import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { Component } from "solid-js";
import { StockType } from "~/components/warehous/location/stockItems";
import {
  DeleteStockItemMutationVariables,
  DeleteStockItemDocument,
  DeleteStockItemMutation,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

interface UseDeleteStockItemProps {
  onSuccess?: () => void;
  stocks: StockType[];
  setStocks: (stocks: StockType[]) => void;
  location: string;
}

export const useDeleteStockItem = ({
  onSuccess,
  location,
}: UseDeleteStockItemProps) => {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: async (variables: DeleteStockItemMutationVariables) => {
      const response = await gqlClient.request<DeleteStockItemMutation>(
        DeleteStockItemDocument,
        variables
      );
      return response.deleteStockItem;
    },
    onSuccess: async () => {
      // rack 쿼리 캐시 무효화 (queryKey를 rack으로 통일)
      await queryClient.invalidateQueries({
        queryKey: ["rack", location],
      });

      onSuccess?.();
    },
  }));
};
