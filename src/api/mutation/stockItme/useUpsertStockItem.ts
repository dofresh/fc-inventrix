import { createMutation, useQueryClient } from "@tanstack/solid-query";
import {
  UpsertStockItemMutationVariables,
  UpsertStockItemMutation,
  UpsertStockItemDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

interface UseUpsertStockItemProps {
  onSuccess?: () => void;
  location: string;
}

export const useUpsertStockItem = ({
  onSuccess,
  location,
}: UseUpsertStockItemProps) => {
  const queryClient = useQueryClient();

  return createMutation(() => ({
    mutationFn: async (
      variables: UpsertStockItemMutationVariables
    ): Promise<UpsertStockItemMutation["upsertStockItem"]> => {
      const response = await gqlClient.request<UpsertStockItemMutation>(
        UpsertStockItemDocument,
        variables
      );
      return response.upsertStockItem;
    },
    onSuccess: (data, variables) => {
      // 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ["GetRackSt", { location }],
      });

      // 캐시 업데이트
      if (data?.stockItem) {
        queryClient.setQueryData(
          ["stockItems", variables.input.productCode],
          (old: any) => {
            if (!old) return { stockItems: [data.stockItem] };
            return {
              ...old,
              stockItems: [...old.stockItems, data.stockItem],
            };
          }
        );
      }

      // 추가 성공 콜백 실행
      onSuccess?.();
    },
  }));
};
