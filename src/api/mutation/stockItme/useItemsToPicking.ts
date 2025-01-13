import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { StockType } from "~/components/warehous/location/stockItems";
import {
  ItemsToPickingMutationVariables,
  ItemsToPickingMutation,
  ItemsToPickingDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

interface UseItemsToPickingProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  location: string;
  getRemainingQuantity: () => string;
  currentStock: StockType | undefined;
}

export const useItemsToPicking = ({
  onSuccess,
  onError,
  location,
  getRemainingQuantity,
  currentStock,
}: UseItemsToPickingProps) => {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: async (
      variables: ItemsToPickingMutationVariables
    ): Promise<ItemsToPickingMutation["itemsToPicking"]> => {
      const response = await gqlClient.request<ItemsToPickingMutation>(
        ItemsToPickingDocument,
        variables
      );
      return response.itemsToPicking;
    },
    onSuccess: (data, variables) => {
      // 에러 처리
      if (data?.errors && data.errors.length > 0) {
        onError?.(data.errors[0].message);
        return;
      }

      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["GetRackSt", { location }],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "GetProductLocations",
          { productCode: variables.input.productCode },
        ],
      });

      // 캐시 업데이트
      if (
        getRemainingQuantity() === "0" &&
        currentStock?.ecountProductCode &&
        currentStock._id
      ) {
        queryClient.setQueryData(
          ["stockItems", currentStock.ecountProductCode],
          (old: any) => {
            if (!old) return old;
            return {
              ...old,
              stockItems: old.stockItems.filter(
                (item: any) => item._id !== currentStock._id
              ),
            };
          }
        );
      }

      // 추가 성공 콜백 실행
      onSuccess?.();
    },
  }));
};
