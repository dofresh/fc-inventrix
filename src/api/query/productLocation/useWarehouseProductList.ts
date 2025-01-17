import { createQuery } from "@tanstack/solid-query";
import {
  WarehouseProductsQuery,
  WarehouseProductsDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useWarehouseProducts = () => {
  return createQuery(() => ({
    queryKey: ["warehouseProducts"],
    queryFn: async () => {
      const response = await gqlClient.request<WarehouseProductsQuery>(
        WarehouseProductsDocument
      );
      return response;
    },
    enabled: true,
  }));
};
