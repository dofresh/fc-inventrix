// src/components/ProductsListElement.tsx
import { Component, For } from "solid-js";

import hangul from "hangul-js";
import { EcountProduct, EcountProductsQuery } from "~/generated/graphql";

interface Props {
  setProduct: (product: EcountProduct | undefined) => void;
  setShowProdList: (show: boolean) => void;
  prodSearch: string;
  productData: EcountProductsQuery | undefined;
}

const ProductsListElement: Component<Props> = (props) => {
  return (
    <div>
      <For each={props.productData?.ecountProducts}>
        {(item, index) => (
          <div
            onClick={() => {
              props.setProduct(item);
              props.setShowProdList(false);
            }}
            class={`flex flex-row items-center my-3 ${
              props.prodSearch === ""
                ? ""
                : hangul.search(item.PROD_DES!, props.prodSearch) !== -1 ||
                  item.PROD_CD?.includes(props.prodSearch)
                ? ""
                : "hidden"
            }`}
          >
            {item.PROD_CD} {item.PROD_DES}
          </div>
        )}
      </For>
    </div>
  );
};

export default ProductsListElement;
