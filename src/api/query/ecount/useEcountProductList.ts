import { createQuery } from "@tanstack/solid-query";
import {
  WarehouseProductsQuery,
  WarehouseProductsDocument,
  EcountProductsQuery,
  EcountProductsDocument,
  GetEcountListInventoryStatusLocationTrendsQuery,
  GetEcountListInventoryStatusLocationTrendsDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useEcountProducts = () => {
  return createQuery(() => ({
    queryKey: ["ecountProducts"],
    queryFn: async () => {
      const response = await gqlClient.request<EcountProductsQuery>(
        EcountProductsDocument
      );
      return response;
    },
    enabled: true,
  }));
};

// useGetEcountListInventoryStatusLocationTrends

export const useGetEcountInventoryLocation = () => {
  return createQuery(() => ({
    queryKey: ["getEcountListInventoryStatusLocationTrends"],
    queryFn: async () => {
      const response =
        await gqlClient.request<GetEcountListInventoryStatusLocationTrendsQuery>(
          GetEcountListInventoryStatusLocationTrendsDocument
        );
      return response;
    },
    enabled: true,
  }));
};
