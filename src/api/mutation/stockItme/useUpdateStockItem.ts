import { createMutation, useQueryClient } from "@tanstack/solid-query";
import {
  UpdateStockItemMutationVariables,
  UpdateStockItemMutation,
  UpdateStockItemDocument,
  StockItemUpdateInput,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

interface UseUpdateStockItemProps {
  onSuccess?: () => void;
  location: string;
  setIsScan?: (isScan: boolean) => void;
}

export const useUpdateStockItem = ({
  onSuccess,
  location,
}: UseUpdateStockItemProps) => {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: async (variables: {
      input: StockItemUpdateInput;
    }): Promise<UpdateStockItemMutation["updateStockItem"]> => {
      const response = await gqlClient.request<UpdateStockItemMutation>(
        UpdateStockItemDocument,
        variables
      );
      return response.updateStockItem;
    },
    onSuccess: (data, variables) => {
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

      // 추가 성공 콜백 실행
      onSuccess?.();
    },
  }));
};
