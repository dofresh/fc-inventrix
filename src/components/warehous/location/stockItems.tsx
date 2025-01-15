import {
  StockItem,
  EcountProduct,
  TotalQuantity,
  User,
  EcountProductsDocument,
  EcountProductsQuery,
} from "~/generated/graphql";
import { createSignal, createEffect, Component, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { BsPlusSquareDotted } from "solid-icons/bs";
import { TbQrcodeOff } from "solid-icons/tb";

import { getGradientColor } from "~/utilities/getGradientColor";
import dayjs from "dayjs";
import { localDate } from "~/lib/dayjs-config";
import AddStockItemsModal from "~/components/Modal/addStockItmesModal";
import { createQuery } from "@tanstack/solid-query";
import { gqlClient } from "~/lib/graphql-client";
import QrGetPallet from "~/components/qrGetPallet";

interface IReplenishment {
  userName: string;
  rack: string;
  replenishmentQuantity: number;
  timestamp: string;
}

export type StockType = {
  _id?: string;
  isPicking: boolean;
  isSorting: boolean;
  isDeleted: boolean;
  timestamp: string;
  warehousingDate: string;
  expirationDate: string;
  ecountProductCode: string;
  ecountProduct: EcountProduct;
  enterQuantity: number;
  quantity: number;
  replenishment: JSON;
  quantityOfEach: number;
  palletCode: string | undefined;
  totalQuantity?: number;
  totalQuantityOfEach?: number;
  ecountInventory?: number;
  lastProdInventory?: number;
  rackLocation?: string;
  recorder: User;
};

interface Props {
  locationStockItems: StockType[] | null | undefined;
  rackId: string | undefined;
  location: string | undefined;
  prodTotalQuantities: TotalQuantity[] | null | undefined;
  pallets: string[] | undefined;
}

const Stock: Component<Props> = (props) => {
  const [isScan, setIsScan] = createSignal(false);
  const [isModalOpen, setModalOpen] = createSignal(false);
  const [currentStock, setCurrentStock] = createSignal<StockType | undefined>();
  const [stocks, setStocks] = createSignal<StockType[]>([]);
  const [stockItems, setStockItems] = createSignal<
    StockType[] | null | undefined
  >();

  // Replace with Solid Query or your GraphQL client
  const productsQuery = createQuery(() => ({
    queryKey: ["ecountProducts"],
    queryFn: async () => {
      const response = await gqlClient.request<EcountProductsQuery>(
        EcountProductsDocument
      );
      return response;
    },
  }));
  const [productData] = createSignal(/* your query implementation */);

  const handleOpenModal = () => setModalOpen(true);
  const newHandleOpenModal = () => {
    setCurrentStock(undefined);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setCurrentStock(undefined);
    setModalOpen(false);
  };

  const time = (a: string) => {
    const kor = new Date(a);
    kor.setHours(kor.getHours());
    return kor.toLocaleString();
  };

  const daysPassedSince = (utcDate: string): number => {
    const dateGiven = new Date(utcDate);
    const currentDate = new Date();
    const differenceInMilliseconds =
      currentDate.getTime() - dateGiven.getTime();
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  };

  createEffect(() => {
    if (props.locationStockItems && props.prodTotalQuantities) {
      const updatedItems = props.locationStockItems.map((item) => {
        const match = props.prodTotalQuantities?.find(
          (prod) => prod.productCode === item.ecountProductCode
        );

        if (match) {
          return {
            ...item,
            totalQuantity: match.quantity,
            totalQuantityOfEach: match.quantityOfEach,
            ecountInventory: match.ecountInventory,
            lastProdInventory: match.lastProdInventory,
          };
        }
        return item;
      });
      setStockItems(updatedItems);
    }
  });

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center w-full">
      <Show when={isModalOpen()}>
        <AddStockItemsModal
          productData={productsQuery.data}
          currentStock={currentStock()}
          isOpen={isModalOpen()}
          onClose={handleCloseModal}
          rackId={props.rackId}
          setStocks={setStocks}
          stocks={stocks()}
          location={props.location || ""}
        />
      </Show>

      <For each={stockItems()}>
        {(stock) => (
          <Show when={stock}>
            <div
              class={`${
                stock.isPicking ? "border-amber-200" : "border-blue-200"
              } ${
                !stock.quantity!! &&
                !stock.quantityOfEach &&
                !stock.enterQuantity &&
                "opacity-30 border-gray-200"
              } w-full border-4 rounded-2xl p-8 m-4 hover:bg-gray-100 cursor-pointer`}
              onClick={() => {
                setCurrentStock({
                  ...stock,
                  rackLocation: props.location,
                });
                setTimeout(handleOpenModal, 150);
              }}
            >
              <div class="flex justify-between items-center">
                <div
                  class={`px-4 ${
                    stock.isPicking
                      ? "bg-amber-300"
                      : stock.isSorting
                      ? "bg-emerald-300"
                      : "bg-blue-300"
                  }`}
                >
                  <Show
                    when={stock.isPicking}
                    fallback={
                      <Show when={stock.isSorting} fallback={<div>보관</div>}>
                        <div>소분</div>
                      </Show>
                    }
                  >
                    <div>피킹</div>
                  </Show>
                </div>
                <Show when={!stock.palletCode}>
                  <TbQrcodeOff size={32} color="#d00" />
                </Show>
              </div>

              <A
                class="block my-4 hover:ring-1"
                href={`/productlocation?productCode=${stock.ecountProductCode!!}`}
                onClick={(event) => event.stopPropagation()}
              >
                <div class="grid grid-cols-7 md:grid-cols-6 items-center ">
                  <div class="flex justify-center items-center col-span-2 md:col-span-2 bg-black h-full text-white font-black text-md md:text-lg line-height">
                    {stock.ecountProduct?.PROD_CD}
                  </div>
                  <div class="col-span-5 md:col-span-4 bg-gray-100 p-2 border">
                    <div>{stock.ecountProduct?.PROD_DES}</div>
                    <div>{stock.ecountProduct?.SIZE_DES}</div>
                  </div>
                </div>
              </A>

              {stock.warehousingDate && (
                <div class="border p-3 rounded-xl">
                  <div>
                    소비기한 :{" "}
                    {stock.expirationDate
                      ? dayjs(stock.expirationDate).format("YYYY년 MM월 DD일")
                      : "----"}
                  </div>
                  <div>
                    <span class="tracking-wider">입 고 일 : </span>

                    {stock.warehousingDate
                      ? dayjs(stock.warehousingDate).format("YYYY년 MM월 DD일")
                      : "----"}
                  </div>
                  <div>
                    입고박스수량:{" "}
                    {stock.enterQuantity ? stock.enterQuantity : "----"}
                  </div>
                </div>
              )}

              <div>작성일: {time(stock.timestamp)}</div>

              <div>
                작성일 Box: {stock.quantity}{" "}
                <span
                  class="bg-gray-500 px-2 rounded-md text-sm font-bold"
                  style={{
                    color: stock.isPicking
                      ? getGradientColor(daysPassedSince(stock.timestamp))
                      : "#FFF",
                  }}
                >
                  D+ {daysPassedSince(stock.timestamp)}
                </span>
              </div>
              {stock.isPicking && (
                <div>
                  <div class="text-lg">
                    Box:{" "}
                    {(
                      stock.quantity -
                      (Number(stock.lastProdInventory) -
                        Number(stock.ecountInventory))
                    ).toFixed(2)}
                    <span class="text-xs">
                      (기록수량 - 누적판매수량:
                      {Number(stock.lastProdInventory) -
                        Number(stock.ecountInventory)}
                      )
                    </span>
                  </div>
                </div>
              )}

              <div>낱개수량: {stock.quantityOfEach}</div>
              <div>기록: {stock.recorder?.username}</div>
              {stock.replenishment && (
                <div class="border p-3 rounded-lg overflow-auto h-24">
                  <div>보충 이력</div>
                  {Array.isArray(stock.replenishment) &&
                    (stock.replenishment as IReplenishment[]).map(
                      (item, index) => {
                        const previousItem =
                          index > 0
                            ? (
                                stock.replenishment as unknown as IReplenishment[]
                              )[index - 1]
                            : undefined;
                        const isRackChanged =
                          !previousItem || previousItem.rack !== item.rack;
                        let date;
                        date = localDate(item.timestamp);
                        // console.log(item.timestamp, date);

                        return (
                          <div class="">
                            {/* rack이 변경되었을 때 구분선과 함께 표시 */}
                            {isRackChanged && (
                              <div class="font-bold mr-1 mt-1">
                                Rack: {item.rack}
                              </div>
                            )}

                            <div class="flex mt-1">
                              <div class="border rounded-lg px-1">
                                {item.replenishmentQuantity}
                              </div>
                              <div class="px-1">{item.userName}</div>
                              <div class="px-1">{date}</div>
                            </div>
                          </div>
                        );
                      }
                    )}
                </div>
              )}
            </div>
          </Show>
        )}
      </For>

      <div class="flex justify-center items-center mt-8">
        <QrGetPallet
          productData={productsQuery.data}
          pallets={props.pallets}
          isScan={isScan()}
          setIsScan={setIsScan}
          rackId={props.rackId}
          location={props.location}
        />
        <Show when={!isScan()}>
          <div
            class="text-[6rem] inline-block cursor-pointer hover:text-green-700"
            onClick={newHandleOpenModal}
          >
            <BsPlusSquareDotted />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Stock;
