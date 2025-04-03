import { createQuery } from "@tanstack/solid-query";
import {
  GetAllEnumCategoriesDocument,
  GetAllEnumCategoriesQuery,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useGetAllEnumCategories = () => {
  return createQuery(() => ({
    queryKey: ["getAllEnumCategories"],
    queryFn: async () => {
      const response = await gqlClient.request<GetAllEnumCategoriesQuery>(
        GetAllEnumCategoriesDocument
      );
      return response.getAllEnumCategories;
    },
    enabled: true,
  }));
};
