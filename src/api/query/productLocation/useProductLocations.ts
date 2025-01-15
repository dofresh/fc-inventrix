import { createQuery, useQueryClient } from "@tanstack/solid-query";
import { Accessor, createEffect } from "solid-js";
import {
  GetProductLocationsQuery,
  GetProductLocationsDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useProductLocations = (productCode: Accessor<string | null>) => {
  const queryClient = useQueryClient();

  // productCode 변경 감지 및 캐시 무효화
  createEffect(() => {
    const code = productCode();
    console.log("Code changed to:", code);

    if (code) {
      queryClient.invalidateQueries({
        queryKey: ["productLocations", code],
      });
    }
  });

  return createQuery(() => {
    const code = productCode();
    return {
      queryKey: ["productLocations", code],
      queryFn: async () => {
        if (!code) return null;
        const response = await gqlClient.request<GetProductLocationsQuery>(
          GetProductLocationsDocument,
          { input: { productCode: code } }
        );
        return response;
      },
      enabled: !!code,
    };
  });
};
