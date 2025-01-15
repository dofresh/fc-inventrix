import { Component, createEffect, createSignal, Show } from "solid-js";
import styles from "./Modal.module.css";
import clsx from "clsx";
import {
  EcountProductsQuery,
  EcountProduct,
  StockItemUpdateInput,
  StockItemInput,
} from "~/generated/graphql";
import Spin from "../Spin";
import { StockType } from "../warehous/location/stockItems";
import { useDeleteStockItem } from "~/api/mutation/stockItme/useDeleteStockItem";
import { useUpsertStockItem } from "~/api/mutation/stockItme/useUpsertStockItem";
import { useUpdateStockItem } from "~/api/mutation/stockItme/useUpdateStockItem";
import { useItemsToPicking } from "~/api/mutation/stockItme/useItemsToPicking";
import ProductsListElement from "../productsListElement";
import { palletType } from "~/types/pallet";

interface ModalProps {
  currentStock?: StockType;
  isOpen: boolean;
  onClose: () => void;
  rackId: string | undefined;
  stocks: StockType[];
  setStocks: (stocks: StockType[]) => void;
  location: string;
  param?: palletType;
  setIsScan?: (isScan: boolean) => void;
  productData: EcountProductsQuery | undefined;
}

const AddStockItemsModal: Component<ModalProps> = (props) => {
  const [product, setProduct] = createSignal<EcountProduct>();
  const [showProdList, setShowProdList] = createSignal(false);
  const [isVisible, setIsVisible] = createSignal(false);
  const [prodSearch, setProdSearch] = createSignal("");

  const [isEditQty, setIsEditQty] = createSignal(false);
  const [palletCode, setPalletCode] = createSignal<string>();
  const [enterQuantity, setEnterQuantity] = createSignal<string>();
  const [quantity, setQuantity] = createSignal<string>();
  const [sortingQuantity, setSortingQuantity] = createSignal<string>("0");
  const [quantityOfEach, setQuantityOfEach] = createSignal<string>();
  const [isPicking, setIsPicking] = createSignal<boolean>(false);
  const [isSorting, setIsSorting] = createSignal<boolean>(false);
  const [isLoading, setIsLoading] = createSignal(false);

  const getNumberValue = (value: string | undefined) => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  };

  const getRemainingQuantity = (): string => {
    const baseQty = Number(quantity() || enterQuantity()) || 0;
    const sortQty = Number(sortingQuantity()) || 0;
    return String(Math.max(0, baseQty - sortQty));
  };

  // GraphQL Mutations
  const deleteMutation = useDeleteStockItem({
    stocks: props.stocks,
    setStocks: props.setStocks,
    location: props.location,
    onSuccess: () => {
      setIsLoading(false);
      props.onClose();
    },
  });

  const upsertMutation = useUpsertStockItem({
    location: props.location,
    onSuccess: () => {
      if (props.setIsScan) props.setIsScan(false);
      setProduct(undefined);
      setQuantity("");
      setQuantityOfEach("");
      setIsLoading(false);
      setIsSorting(false);
      setSortingQuantity("");
      props.onClose();
    },
  });
  const updateMutation = useUpdateStockItem({
    location: props.location,
    onSuccess: () => {
      if (props.setIsScan) props.setIsScan(false);
      setProduct(undefined);
      setQuantity("");
      setQuantityOfEach("");
      setIsLoading(false);
      setIsSorting(false);
      setSortingQuantity("");
      props.onClose();
    },
  });
  const itemsToPickingMutation = useItemsToPicking({
    location: props.location,
    getRemainingQuantity,
    currentStock: props.currentStock,
    onError: (errorMessage) => {
      alert(errorMessage);
      setIsLoading(false);
    },
    onSuccess: () => {
      if (props.setIsScan) props.setIsScan(false);
      setProduct(undefined);
      setQuantity("");
      setQuantityOfEach("");
      setIsLoading(false);
      setIsSorting(false);
      setSortingQuantity("");
      props.onClose();
    },
  });

  createEffect(() => {
    if (props.productData && props.param) {
      if (props.param.palletCode) {
        setPalletCode(props.param.palletCode);
      }
      if (props.param.enterQuantity) {
        setEnterQuantity(String(props.param.enterQuantity));
      }
      if (props.param.productCode) {
        const prod = props.productData.ecountProducts.find(
          (product) => product.PROD_CD === props.param?.productCode
        );
        setProduct(prod);
      }
    }
  });

  createEffect(() => {
    if (props.currentStock) {
      console.log("currentStock", props.currentStock.quantity);
      setProduct(props.currentStock.ecountProduct);
      setQuantity(String(props.currentStock.quantity) || "");
      setQuantityOfEach(String(props.currentStock.quantityOfEach) || "");
      setIsPicking(props.currentStock.isPicking || false);
      setIsSorting(props.currentStock.isSorting || false);
      setEnterQuantity(String(props.currentStock.enterQuantity) || "");
      setPalletCode(props.currentStock.palletCode || "");
    } else {
      setProduct(undefined);
      setQuantity("");
      setQuantityOfEach("");
      setIsPicking(false);
      setIsSorting(false);
      setEnterQuantity("");
      setPalletCode("");
    }
  });

  createEffect(() => {
    setIsEditQty(false);
  });

  createEffect(() => {
    if (isSorting()) {
      setSortingQuantity("");
    }
  });

  return (
    <Show when={props.isOpen} fallback={null}>
      <Spin isOpen={isLoading()} />
      <div
        class={clsx(styles.overlay, {
          [styles.overlayVisible]: isVisible(),
        })}
        onClick={props.onClose}
      >
        <div
          class={clsx(styles.modal, {
            [styles.modalVisible]: isVisible(),
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <div class="flex justify-between">
            <div>
              <Show when={!isSorting()}>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="peer sr-only opacity-0"
                    id="togglePicking"
                    checked={isPicking()}
                    onChange={(e) => setIsPicking(e.target.checked)}
                  />
                  <label
                    for="togglePicking"
                    class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  >
                    <span class="sr-only">Enable</span>
                  </label>
                  <span class="ml-2 text-xs text-gray-500">피킹용</span>
                </div>
              </Show>
            </div>
            <div>
              <Show when={!isPicking()}>
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    class="peer sr-only opacity-0"
                    id="toggleSorting"
                    checked={isSorting()}
                    onChange={(e) => setIsSorting(e.target.checked)}
                  />
                  <label
                    for="toggleSorting"
                    class="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                  >
                    <span class="sr-only">Enable</span>
                  </label>
                  <span class="ml-2 text-xs text-gray-500">소분용</span>
                </div>
              </Show>
            </div>
          </div>
          <h2 class="text-xl text-center mb-8">재고품목정보</h2>
          <div class="relative">
            <div>
              <div class="w-[22rem] h-8">
                <Show
                  when={props.currentStock?.ecountProduct}
                  fallback={
                    <div class="absolute top-[-2px]">
                      {product()?.PROD_CD ? (
                        `품명${product()?.PROD_CD} ${product()?.PROD_DES} ${
                          product()?.SIZE_DES
                        }`
                      ) : (
                        <div class="text-gray-300"> 품목검색...</div>
                      )}
                    </div>
                  }
                >
                  <div class="absolute top-[-2px]">
                    품명{props.currentStock?.ecountProduct.PROD_CD}
                    {props.currentStock?.ecountProduct.PROD_DES}
                    {props.currentStock?.ecountProduct.SIZE_DES}
                  </div>
                </Show>
                <div>
                  <input
                    type="text"
                    onInput={(e) => setProdSearch(e.currentTarget.value)}
                    onFocus={() => {
                      if (!props.currentStock) {
                        setShowProdList(true);
                        setProdSearch("");
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        setShowProdList(false);
                      }, 200);
                    }}
                    class="z-100 w-full max-w-[290px] h-12"
                  />
                </div>

                <Show
                  when={showProdList() && props.productData?.ecountProducts}
                >
                  <div class="absolute overflow-auto max-h-60 bg-white p-6 rounded-lg shadow-lg border">
                    <ProductsListElement
                      setProduct={setProduct}
                      setShowProdList={setShowProdList}
                      prodSearch={prodSearch()}
                      productData={props.productData}
                    />
                  </div>
                </Show>
              </div>

              <Show when={palletCode() && !isPicking()}>
                <div>
                  <span>입고박스수량: {enterQuantity()}</span>{" "}
                  <button
                    disabled={false}
                    class={`ml-2 hover:border-slate-600 bg-slate-600 ${
                      !product() && "bg-slate-200"
                    } text-white border-4 py-1 px-3 rounded-lg`}
                    onClick={() => setIsEditQty(!isEditQty())}
                  >
                    재고수량 수정
                  </button>
                </div>
              </Show>

              <Show
                when={isSorting()}
                fallback={
                  <div>
                    <div>
                      <span class="text-xs">박스수량</span>
                      <input
                        class="my-4 text-xl ml-2 border-2 rounded-lg p-2"
                        type="number"
                        value={quantity() || enterQuantity() || ""}
                        onInput={(e) => setQuantity(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <span class="text-xs">낱개수량</span>
                      <input
                        class="my-4 text-xl ml-2 border-2 rounded-lg p-2"
                        type="number"
                        value={props.currentStock?.quantityOfEach || ""}
                        onInput={(e) => {
                          setQuantityOfEach(e.currentTarget.value);
                        }}
                      />
                    </div>
                  </div>
                }
              >
                <div>
                  <div>
                    <div>
                      <span class="text-xs">박스수량</span>
                      <div class="my-4 text-xl ml-2 border-2 rounded-lg p-2 bg-gray-100">
                        {getRemainingQuantity()}
                      </div>
                    </div>
                    <div>
                      <span class="text-xs">낱개수량</span>
                      <div class="my-4 text-xl ml-2 border-2 rounded-lg p-2 bg-gray-100">
                        {props.currentStock?.quantityOfEach}
                      </div>
                    </div>
                    <div>
                      <div class="border" />
                      <span class="text-xs">피킹이동 박스수량</span>
                      <input
                        type="number"
                        class="w-full my-4 text-xl ml-2 border-2 rounded-lg p-2"
                        value={sortingQuantity() || ""}
                        onChange={(e) => {
                          const newValue = e.currentTarget.value;
                          if (
                            Number(newValue) >= 0 &&
                            Number(newValue) <= Number(quantity())
                          ) {
                            setSortingQuantity(newValue);
                          }
                        }}
                        min="0"
                        max={quantity()}
                      />
                    </div>
                  </div>
                </div>
              </Show>
            </div>
          </div>

          <div class="flex flex-row justify-between mt-8 space-x-2">
            <div>
              <Show when={props.currentStock}>
                <button
                  class="hover:border-orange-300 hover:bg-orange-300 text-white border-4 bg-gray-300 py-1 px-2 md:py-3 md:px-5 rounded-lg"
                  onClick={async () => {
                    setIsLoading(true);
                    const isConfirmed = window.confirm(
                      "이 재고 항목을 삭제하시겠습니까? 재고 수량은 삭제됩니다."
                    );

                    if (isConfirmed && props.currentStock) {
                      await deleteMutation.mutateAsync({
                        input: {
                          rackId: props.rackId!,
                          stockId: props.currentStock._id!,
                        },
                      });
                      setIsLoading(false);
                      props.onClose();
                    }
                  }}
                >
                  제거
                </button>
              </Show>
            </div>

            <div class="">
              <Show
                when={props.currentStock}
                fallback={
                  <button
                    disabled={!product()}
                    class={`hover:border-slate-600 bg-slate-600 ${
                      !product() && "bg-slate-200"
                    } text-white border-4 py-1 px-2 md:py-3 md:px-5 rounded-lg`}
                    onClick={async () => {
                      setIsLoading(true);
                      await upsertMutation.mutateAsync({
                        input: {
                          isPicking: isPicking(),
                          isSorting: isSorting(),
                          sortedQuantity: Number(sortingQuantity()),
                          enterQuantity: props.param?.enterQuantity,
                          quantity: quantity()
                            ? Number(quantity()) - Number(sortingQuantity())
                            : props.param?.enterQuantity,
                          quantityOfEach: Number(quantityOfEach()),
                          productCode: palletCode()
                            ? String(props.param?.productCode)
                            : String(product()?.PROD_CD),
                          rackId: String(props.rackId),
                          rackLocation: props.location,
                          warehousingDate: props.param?.warehousingDate,
                          expirationDate: props.param?.expirationDate,
                          palletCode: props.param?.palletCode,
                        } as StockItemInput,
                      });
                    }}
                  >
                    생성
                  </button>
                }
              >
                <Show
                  when={isSorting()}
                  fallback={
                    <button
                      class={`hover:border-slate-600 bg-slate-600 ${
                        !product() && "bg-slate-200"
                      } text-white border-4 py-1 px-2 md:py-3 md:px-5 rounded-lg`}
                      onClick={async () => {
                        setIsLoading(true);
                        await updateMutation.mutateAsync({
                          input: {
                            isPicking: isPicking(),
                            isSorting: isSorting(),
                            sortedQuantity: getNumberValue(sortingQuantity()),
                            stockId: props.currentStock!._id!,
                            quantity:
                              getNumberValue(quantity()) -
                              getNumberValue(sortingQuantity()),
                            quantityOfEach: getNumberValue(quantityOfEach()),
                            productCode: String(product()?.PROD_CD),
                            rackId: String(props.rackId),
                            rackLocation: props.location,
                          } as StockItemUpdateInput,
                        });
                      }}
                    >
                      저장
                    </button>
                  }
                >
                  <button
                    disabled={Number(getRemainingQuantity()) < 0}
                    class={`hover:border-slate-600 bg-slate-600 ${
                      (sortingQuantity() === "0" || sortingQuantity() === "") &&
                      "!bg-slate-200"
                    } text-white border-4 py-1 px-2 md:py-3 md:px-5 rounded-lg`}
                    onClick={async () => {
                      setIsLoading(true);

                      let isConfirmed = true;

                      if (getRemainingQuantity() === "0") {
                        isConfirmed = window.confirm(
                          "이 재고 항목을 삭제하시겠습니까? 재고 수량은 삭제됩니다."
                        );
                      }

                      if (isConfirmed && props.currentStock) {
                        await itemsToPickingMutation.mutateAsync({
                          input: {
                            _id: props.currentStock._id || "",
                            isPicking: isPicking(),
                            quantity: getNumberValue(quantity()),
                            sortedQuantity: getNumberValue(sortingQuantity()),
                            productCode: props.currentStock.ecountProductCode,
                          },
                        });
                      } else {
                        setIsLoading(false);
                      }
                    }}
                  >
                    {Number(getRemainingQuantity()) === 0
                      ? "이동 후 소멸"
                      : "피킹존으로 이동"}
                  </button>
                </Show>
              </Show>

              <button
                class="hover:border-orange-300 hover:bg-orange-300 text-white border-4 bg-gray-300 py-1 px-2 md:py-3 md:px-5 rounded-lg ml-4"
                onClick={() => {
                  if (props.setIsScan) props.setIsScan(false);
                  props.onClose();
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default AddStockItemsModal;
