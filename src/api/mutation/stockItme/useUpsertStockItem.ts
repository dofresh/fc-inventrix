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
      console.log("1. Mutation 시작:", variables);
      const response = await gqlClient.request<UpsertStockItemMutation>(
        UpsertStockItemDocument,
        variables
      );
      console.log("2. Mutation 응답:", response);
      return response.upsertStockItem;
    },
    onSuccess: async (data) => {
      // 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ["rack", location],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          "GetProductLocations",
          { productCode: data.stockItem.ecountProductCode },
        ],
      });

      onSuccess?.();
    },
  }));
};
