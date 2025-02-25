import { createQuery } from "@tanstack/solid-query";
import {
  GetStorageItemsQuantityDocument,
  GetStorageItemsQuantityQuery,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useActualStorageItemsQuantity = (recodedDate: string) => {
  return createQuery(() => ({
    queryKey: ["getStorageItemsQuantityDocument"],
    queryFn: async () => {
      const response = await gqlClient.request<GetStorageItemsQuantityQuery>(
        GetStorageItemsQuantityDocument,
        { recodedDate }
      );
      return response;
    },
    enabled: true,
  }));
};
