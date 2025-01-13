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
  stocks,
  setStocks,
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
    onSuccess: (data, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["GetRackSt", { location }],
      });

      // 캐시 업데이트
      const stockId = variables.input.stockId;
      queryClient.setQueryData(["stockItems"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          stockItems: old.stockItems.filter(
            (item: any) => item._id !== stockId
          ),
        };
      });

      // UI 업데이트
      const filteredStocks = stocks.filter(
        (stock) => String(stock._id) !== stockId || stock.isDeleted
      );
      setStocks(filteredStocks);

      // 추가 성공 콜백 실행
      onSuccess?.();
    },
  }));
};
