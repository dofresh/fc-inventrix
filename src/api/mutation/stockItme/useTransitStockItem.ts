import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { StockType } from "~/components/warehous/location/stockItems";
import {
  TransitStockItemMutationVariables,
  TransitStockItemMutation,
  TransitStockItemDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

interface UseTransitStockItemProps {
  onSuccess?: () => void;
  stocks: StockType[];
  setStocks: (stocks: StockType[]) => void;
  location: string;
  setIsScan?: (isScan: boolean) => void;
}

export const useTransitStockItem = ({
  onSuccess,
  stocks,
  setStocks,
  location,
  setIsScan,
}: UseTransitStockItemProps) => {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: async (
      variables: TransitStockItemMutationVariables
    ): Promise<TransitStockItemMutation["transitStockItem"]> => {
      const response = await gqlClient.request<TransitStockItemMutation>(
        TransitStockItemDocument,
        variables
      );
      return response.transitStockItem;
    },
    onSuccess: (data, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["GetRackSt", { location }],
      });

      // UI 업데이트
      const stockId = variables.input.stockId;
      const filteredStocks = stocks.filter(
        (stock) => String(stock._id) !== stockId
      );
      setStocks(filteredStocks);

      // 스캔 상태 업데이트
      if (setIsScan) setIsScan(false);

      // 추가 성공 콜백 실행
      onSuccess?.();
    },
  }));
};
