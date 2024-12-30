import { createSignal, Match, Show, Switch } from "solid-js";

import { createQuery, createMutation } from "@tanstack/solid-query";
import { gqlClient } from "../lib/graphql-client";
import { warehouseMenu } from "./warehouseMenu";
import {
  EcountProductAllUpsertDocument,
  WarehouseBoardDocument,
  WarehouseBoardQuery,
} from "~/generated/graphql";
import { A } from "@solidjs/router";
import { BsDatabaseDown } from "solid-icons/bs";

export default function Home() {
  const [showUnboxingProduct, setShowUnboxingProduct] = createSignal(false);

  const warehouseQuery = createQuery(() => ({
    queryKey: ["warehouseBoard"],
    queryFn: async () => {
      try {
        const { warehouseBoard } = await gqlClient.request<WarehouseBoardQuery>(
          WarehouseBoardDocument
        );
        return warehouseBoard;
      } catch (error) {
        console.error("Query error:", error);
        throw error;
      }
    },
  }));

  const ecountMutation = createMutation(() => ({
    mutationFn: async () => {
      try {
        return await gqlClient.request(EcountProductAllUpsertDocument);
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      warehouseQuery.refetch();
    },
  }));

  return (
    <div>
      <div class="relative mb-4 flex flex-col items-end">
        <Show when={warehouseQuery.isPending}>
          <div class="absolute spinner right-8 top-8" />
        </Show>

        <BsDatabaseDown
          size={60}
          class={`mt-4 mx-4 peer ${ecountMutation.isIdle ? "opacity-30" : ""}`}
          onClick={() => ecountMutation.mutate()}
        />
        <div class="text-right md:text-gray-200 peer-hover:text-gray-700">
          이카운트 제품정보 업데이트
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <div class="md:hidden pb-8">
        <ul>
          {warehouseMenu
            .filter((menu) => menu.name !== "대시보드")
            .map((item) => (
              <li>
                <A class="link" href={item.url || ""}>
                  {item.Icon && <item.Icon class="min-w-max" size={23} />}
                  {item.name}
                </A>
              </li>
            ))}
        </ul>
      </div>

      {/* 메인 컨텐츠 */}
      <Show when={warehouseQuery.data !== undefined}>
        <div class="col-span-6 p-8 border rounded-xl flex flex-col justify-center hover:text-sky-400">
          <div
            onClick={() => setShowUnboxingProduct(!showUnboxingProduct())}
            class={`cursor-pointer ${
              showUnboxingProduct() ? "border-b mb-4 pb-2" : ""
            } flex text-lg pt-2`}
          >
            <div>
              <span>낱개소분 현황 </span>
              <span class="text-xs">해당품목수</span>
              <span class="text-xs bg-gray-600 text-white p-1 ml-1 rounded-full">
                {warehouseQuery.data?.inventoryEAs?.length}
              </span>
            </div>
          </div>

          <div
            class={`${
              !showUnboxingProduct() ? "hidden" : ""
            } h-40 overflow-auto text-gray-600`}
          >
            {warehouseQuery.data?.inventoryEAs?.map((item) => (
              <div class="flex items-center">
                <div class="bg-gray-600 rounded-full px-2 m-2 text-white text-xs">
                  {item.productCode}
                </div>
                <div>{item.productDescript}</div>
                <div class="ml-4 border-2 px-2">{item.size}</div>
              </div>
            ))}
          </div>
        </div>
      </Show>
    </div>
  );
}
