import {
  Component,
  createSignal,
  createEffect,
  Show,
  For,
  createMemo,
} from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import hangul from "hangul-js";
import dayjs from "dayjs";
import { EcountProduct } from "~/generated/graphql";
import Spin from "~/components/Spin";
import { useWarehouseProducts } from "~/api/mutation/\bproductLocation/useWarehouseProductList";
import { useProductLocations } from "~/api/mutation/\bproductLocation/useProductLocations";

const ProductLocation: Component = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = createSignal(false);
  const [searchParams] = useSearchParams<{ productCode: string }>();

  const [liveInv, setLiveInv] = createSignal(0);
  const [product, setProduct] = createSignal<EcountProduct>();
  const [showProdList, setShowProdList] = createSignal(false);
  const [prodSearch, setProdSearch] = createSignal("");

  const urlProductCode = createMemo(() => searchParams.productCode || null);
  // Products Query
  const productsQuery = useWarehouseProducts();
  const locationsQuery = useProductLocations(urlProductCode);

  // 로딩 상태 확인을 위한 memo
  //   const isLoading = createMemo(
  //     () => productsQuery.isLoading || locationsQuery.isLoading
  //   );

  createEffect(() => {
    console.log("productsQuery.isLoading", productsQuery.isLoading);
  });
  createEffect(() => {
    console.log("locationsQuery.isLoading", locationsQuery.isLoading);
  });

  // Product List Component
  const ProductsList = () => (
    <For each={productsQuery.data?.warehouseProducts}>
      {(item) => (
        <div
          onClick={() => {
            setProduct(item);
            setShowProdList(false);
            navigate(`/productlocation?productCode=${item.PROD_CD!!}`);
          }}
          class={`flex flex-row items-center my-3 ${
            prodSearch() === ""
              ? ""
              : hangul.search(item.PROD_DES!!, prodSearch()) !== -1 ||
                item.PROD_CD?.includes(prodSearch())
              ? ""
              : "hidden"
          }`}
        >
          {item.PROD_CD} {item.PROD_DES}
        </div>
      )}
    </For>
  );

  // Effects
  createEffect(() => {
    const data = locationsQuery.data?.getProductLocations;
    if (data) {
      const cumulativeSale =
        Number(data.lastProdInventory) - Number(data.inventory);
      setLiveInv(Number(data.totalQuantity) - cumulativeSale);
    }
  });

  createEffect(() => {
    const code = urlProductCode();
    if (code && productsQuery.data?.warehouseProducts) {
      const found = productsQuery.data.warehouseProducts.find(
        (p) => p.PROD_CD === code
      );
      if (found) setProduct(found);
    }
  });

  // 쿼리 로딩 상태 추적
  createEffect(() => {
    if (locationsQuery.isLoading) {
      setIsLoading(true);
    } else {
      // 약간의 지연을 주어 UI가 갑자기 변경되는 것을 방지
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  });
  return (
    <div class="flex flex-col justify-center">
      <main class="max-w-5xl flex-1 mx-auto py-4 text-gray-600">
        <div>
          <Spin isOpen={isLoading()} />
          <div class="w-full flex flex-col items-center">
            <div class="w-full text-center text-2xl my-8">품목위치현황</div>

            {/* Search Input */}
            <div class="relative flex justify-center">
              <div class="w-full max-w-[490px] py-3 px-6 mx-4 h-12 shadow-inner border rounded-full bg-white">
                <input
                  type="text"
                  placeholder="검색..."
                  onInput={(e) => setProdSearch(e.currentTarget.value)}
                  onFocus={() => {
                    setShowProdList(true);
                    setProdSearch("");
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowProdList(false);
                    }, 200);
                  }}
                  class="focus:outline-none flex justify-center w-full"
                />
                <Show
                  when={showProdList() && productsQuery.data?.warehouseProducts}
                >
                  <div class="absolute top-14 overflow-auto max-h-60 bg-white p-6 rounded-lg shadow-lg border">
                    <ProductsList />
                  </div>
                </Show>
              </div>
            </div>

            {/* Product Details */}
            <Show when={product() && locationsQuery.data?.getProductLocations}>
              <div>
                {/* Product Info */}
                <div class="flex justify-center">
                  <div class="flex items-center m-4">
                    <div class="bg-gray-200 px-4 m-2 rounded-lg">
                      <div>{product()?.PROD_CD}</div>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="border-b-2 px-2">{product()?.PROD_DES}</div>
                      <div>{product()?.SIZE_DES}</div>
                    </div>
                  </div>
                </div>

                {/* Inventory Info */}
                <Show when={locationsQuery.data?.getProductLocations}>
                  <div>
                    <div class="flex justify-center items-center text-center my-3 gap-12">
                      <div>
                        전산재고 :{" "}
                        {locationsQuery.data?.getProductLocations.inventory ??
                          0}
                      </div>
                      <div>예측재고 : {liveInv()}</div>
                      <div>
                        실사재고 :{" "}
                        {Number(
                          locationsQuery.data?.getProductLocations.totalQuantity
                        )}
                      </div>
                    </div>

                    {/* Cumulative Info */}
                    <div class="flex justify-center items-center text-center my-3 gap-12">
                      <div class="flex items-center">
                        <div>누적출고수 : </div>
                        <div class="ml-1 bg-gray-800 text-white px-2 rounded-lg text-2xl">
                          {Number(
                            locationsQuery.data?.getProductLocations
                              .lastProdInventory
                          ) -
                            (locationsQuery.data?.getProductLocations
                              .inventory || 0)}
                        </div>
                      </div>
                      <div class="flex items-center">
                        오차 :{" "}
                        <div
                          class={`p-3 mx-2 rounded-full text-lg font-bold text-white ${
                            (liveInv() || 0) -
                              (locationsQuery.data?.getProductLocations
                                .inventory || 0) <
                            0
                              ? "bg-red-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {(liveInv() || 0) -
                            (locationsQuery.data?.getProductLocations
                              .inventory || 0) >
                            0 && <span>+</span>}
                          {(liveInv() || 0) -
                            (locationsQuery.data?.getProductLocations
                              .inventory || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Show>

                {/* Stock Items List */}
                <div class={`${showProdList() && "hidden"} w-full`}>
                  <For
                    each={locationsQuery.data?.getProductLocations.stockItems}
                  >
                    {(stock) => (
                      <Show when={stock}>
                        <div class="flex justify-center items-center w-full">
                          <div class="flex max-w-[490px] w-full p-4 text-2xl md:text-4xl">
                            <button
                              onClick={() => {
                                navigate(`/warehouse/${stock.rackLocation}`);
                              }}
                              class="relative whitespace-nowrap active:bg-gray-600 active:text-white cursor-pointer border px-3 py-2 md:px-5 md:py-3 shadow text-center mr-2"
                            >
                              {stock.rackLocation}
                              {(stock.isPicking || stock.isSorting) && (
                                <div
                                  style={{
                                    position: "absolute",
                                    right: "0",
                                    width: "0",
                                    height: "0",
                                    "border-left": "30px solid transparent",
                                    ...(stock.isPicking
                                      ? {
                                          top: "0",
                                          "border-top": "30px solid #ee9900",
                                        }
                                      : {
                                          bottom: "0",
                                          "border-bottom": "30px solid #10b981",
                                        }),
                                  }}
                                />
                              )}
                            </button>

                            <div class="grow w-full flex flex-col justify-center">
                              <div>
                                <span class="ml-2">
                                  {stock.isPicking
                                    ? Number(stock.quantity) -
                                      (Number(
                                        locationsQuery.data?.getProductLocations
                                          .lastProdInventory
                                      ) -
                                        (locationsQuery.data
                                          ?.getProductLocations.inventory || 0))
                                    : stock.quantity}{" "}
                                  <span class="text-lg">BOX</span>
                                </span>
                                <Show when={stock.quantityOfEach}>
                                  <span>
                                    {stock.quantityOfEach}
                                    <span class="text-lg">EA</span>
                                  </span>
                                </Show>
                              </div>
                              <div class="w-full text-xs md:text-sm bg-gray-600 text-white px-2">
                                <span class="bg-white text-gray-500 rounded-full px-2 mr-2">
                                  {stock.recorder?.username}{" "}
                                </span>
                                기록일 :{" "}
                                {dayjs(stock.timestamp).format(
                                  "YYYY년 MM월 DD일"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Show>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductLocation;
