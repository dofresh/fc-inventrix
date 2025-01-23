import { createSignal, Show, For } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import { useNavigate } from "@solidjs/router";
import hangul from "hangul-js";
import dayjs from "dayjs";
import { TiPrinter } from "solid-icons/ti";

import { A } from "@solidjs/router";
import IconButton from "~/components/IconButton";
import { useEcountProducts } from "~/api/query/ecount/useEcountProductList";
import Layout from "~/components/Layout";

interface EcountProduct {
  PROD_CD?: string;
  PROD_DES?: string;
  SIZE_DES?: string;
}

const ECOUNT_PRODUCTS_QUERY = `
  query EcountProducts {
    ecountProducts {
      PROD_CD
      PROD_DES
      SIZE_DES
    }
  }
`;

const PrintPalletLabel = () => {
  const [showProdList, setShowProdList] = createSignal(false);
  const [prodSearch, setProdSearch] = createSignal("");
  const [pageSize, setPageSize] = createSignal<number | undefined>(1);
  const [product, setProduct] = createSignal<EcountProduct | null>(null);
  const [size, setSize] = createSignal<string | undefined>();
  const [atDate, setAtDate] = createSignal(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [expirationDate, setExpirationDate] = createSignal(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [productName, setProductName] = createSignal<string | undefined>();

  const ecountProducts = useEcountProducts();

  const resetHandle = () => {
    setPageSize(1);
    setProduct(null);
    setSize(undefined);
    setAtDate(dayjs(new Date()).format("YYYY-MM-DD"));
    setExpirationDate(dayjs(new Date()).format("YYYY-MM-DD"));
  };

  const sizeInputHandle = (e: any) => {
    setSize(e.target.value);
  };

  const pageSizeInputHandle = (e: any) => {
    setPageSize(e.target.value);
  };

  const prodSearchInputHandle = (e: any) => {
    setProdSearch(e.target.value);
  };

  const getPrintUrl = () => {
    // const frontendUrl = encodeURIComponent("http://localhost:3004/pallet/");
    const serverUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/generate-pallet-url-pdf?`;
    const frontendUrl = `frontendUrl=${import.meta.env.VITE_HOME_URL}/pallet/`;

    const queryCode = `&productCode=${product()?.PROD_CD}`;
    const queryDes = `&productDes=${product()?.PROD_DES} ${
      product()?.SIZE_DES
    }`;
    const queryAtDate = `&atDate=${atDate()}`;
    const queryExpirationDate = `&expirationDate=${
      atDate() !== expirationDate() ? expirationDate() : ""
    }`;
    const querySize = `&size=${size()}`;
    const queryPageSize = `&pageSize=${pageSize()}`;
    console.log(
      `${serverUrl}${frontendUrl}${queryCode}${queryDes}${queryAtDate}${queryExpirationDate}${querySize}${queryPageSize}`
    );

    return `${serverUrl}${frontendUrl}${queryCode}${queryDes}${queryAtDate}${queryExpirationDate}${querySize}${queryPageSize}`;
  };

  const ProductsList = () => (
    <Show when={ecountProducts.data?.ecountProducts}>
      <For each={ecountProducts.data?.ecountProducts}>
        {(item, index) => (
          <div
            onClick={() => {
              setProduct(item);
              setSize(undefined);
              setAtDate(dayjs(new Date()).format("YYYY-MM-DD"));
              setExpirationDate(dayjs(new Date()).format("YYYY-MM-DD"));
              setShowProdList(false);
            }}
            classList={{
              "flex flex-row items-center my-3": true,
              hidden:
                prodSearch() !== "" &&
                hangul.search(item.PROD_DES!, prodSearch()) === -1 &&
                !item.PROD_CD?.includes(prodSearch()),
            }}
          >
            {item.PROD_CD} {item.PROD_DES}
          </div>
        )}
      </For>
    </Show>
  );

  return (
    <Layout>
      <div class=" w-full flex flex-col itmes-center">
        <div class="relative w-full flex justify-center items-center gap-2 text-center text-2xl my-8">
          <div>파렛트라벨 인쇄</div>

          <input
            class="w-24 text-[3rem] md:text-[4rem] text-right"
            type="number"
            min={0}
            value={pageSize() || ""}
            onFocus={() => setPageSize(undefined)}
            onInput={pageSizeInputHandle}
          />
          <A class="pt-3" href={getPrintUrl()} target="_blank">
            <IconButton isEnable={product() !== undefined}>
              <TiPrinter />
            </IconButton>
          </A>
        </div>
        <div class="relative flex justify-center">
          <div class="w-full max-w-[490px] py-3 px-6 mx-4 h-12 shadow-inner border rounded-full bg-white">
            <input
              type="text"
              placeholder="품목검색..."
              onInput={prodSearchInputHandle}
              onFocus={() => {
                setShowProdList(true);
                resetHandle();
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowProdList(false);
                }, 200);
              }}
              class="focus:outline-none flex justify-center w-full"
            />
            <Show when={showProdList() && ecountProducts.data?.ecountProducts}>
              <div class="absolute top-14 overflow-auto max-h-60 bg-white p-6 rounded-lg shadow-lg border">
                <ProductsList />
              </div>
            </Show>
          </div>
        </div>
        <Show when={product()}>
          <div class="font-nanum font-[700]">
            <div class="mt-6 md:mt-12 text-center text-[1rem]">
              {`품목명: ${product()?.PROD_DES}  ${product()?.SIZE_DES}`}
            </div>
            <div class="text-center text-[4rem] md:text-[6rem]">
              {product()?.PROD_CD}
            </div>
            <Show when={productName()}>
              <div class="text-center text-[1rem]">{`제품명: ${productName()}`}</div>
            </Show>

            <hr class="border-2 border-gray-700" />
            <div class="flex flex-col items-center md:flex-row md:justify-around mt-4 md:mt-8">
              <div class="flex flex-col items-center gap-4">
                <div class="text-2xl text-center">
                  <div class="text-lg">소비기한</div>
                  <input
                    classList={{
                      "text-gray-200": atDate() === expirationDate(),
                    }}
                    type="date"
                    value={expirationDate()}
                    onInput={(e) => setExpirationDate(e.target.value)}
                  />
                </div>
                <div>
                  <span>입고일: </span>
                  <input
                    type="date"
                    value={atDate()}
                    onInput={(e) => setAtDate(e.target.value)}
                  />
                </div>
              </div>
              <div class="hidden md:block w-1 h-36 bg-gray-700" />
              <input
                class="w-80 md:w-60 text-[6rem] md:text-[8rem] text-center"
                placeholder="0"
                min={0}
                type="number"
                value={size() || ""}
                onInput={sizeInputHandle}
              />
            </div>
          </div>
        </Show>
      </div>
    </Layout>
  );
};

export default PrintPalletLabel;
