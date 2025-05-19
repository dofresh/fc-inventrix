import { createEffect, createSignal, JSX, onCleanup, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { MallProductDetailPage } from "~/generated/graphql";

import { useGetMallProductDetailPages } from "~/api/query/mall/mallProductQuery";
import SearchInput from "~/components/seachInput";
import GetCloudFlareImage, {
  SizeType,
} from "~/components/cloudflare/getCloudFlareImage";
import Layout from "~/components/Layout";
import { StorageTypeIconMapping } from "~/lib/stroageTypeIconMapping";

const PRODUCTS_PER_PAGE = 10;

const Products = () => {
  const [page, setPage] = createSignal(0);
  const [products, setProducts] = createSignal<MallProductDetailPage[]>([]);
  let loadMoreRef: HTMLDivElement | undefined;

  const navigate = useNavigate();

  const goToProduct = (id: string) => {
    navigate(`/mall/productInfo/${id}`);
  };

  // Using the new TanStack Query hook
  const query = useGetMallProductDetailPages({
    limit: PRODUCTS_PER_PAGE,
    offset: 0,
    sortField: "name",
    sortOrder: 1,
    input: { productCode: "", name: "" },
  });

  // Access data from query
  const data = () => query.data;
  const isLoading = () => query.isLoading;
  const isError = () => query.isError;
  const error = () => query.error;

  // Load more function
  const loadMore = async () => {
    if (!data()?.getMallProductDetailPages?.hasMore) return;

    const nextPage = page() + 1;
    const offset = nextPage * PRODUCTS_PER_PAGE;

    const result = await query.fetchMore({
      limit: PRODUCTS_PER_PAGE,
      offset,
      sortField: "name",
      sortOrder: 1,
      input: { productCode: "", name: "" },
    });

    // Update products with all items
    if (result?.data?.getMallProductDetailPages?.mallProductDetailPages) {
      const currentProducts = products();
      const newProducts =
        result.data.getMallProductDetailPages.mallProductDetailPages;

      // Merge products manually since we're not using Apollo's cache
      setProducts([
        ...currentProducts,
        ...newProducts,
      ] as MallProductDetailPage[]);
    }

    setPage(nextPage);
  };

  // Update products when initial data loads
  createEffect(() => {
    const productData =
      data()?.getMallProductDetailPages?.mallProductDetailPages;
    if (productData) {
      setProducts(productData as MallProductDetailPage[]);
    }
  });

  // Set up intersection observer
  onMount(() => {
    // 페이지에 들어올 때마다 products 상태 초기화 확인
    const productData =
      data()?.getMallProductDetailPages?.mallProductDetailPages;
    if (productData && products().length === 0) {
      setProducts(productData as MallProductDetailPage[]);
      setPage(0);
    }

    if (!loadMoreRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          !isLoading() &&
          data()?.getMallProductDetailPages?.hasMore
        ) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef);

    onCleanup(() => {
      if (loadMoreRef) {
        observer.unobserve(loadMoreRef);
      }
    });
  });

  if (isError()) {
    return (
      <div class="p-4 text-center text-red-500">
        오류가 발생했습니다: {String(error())}
      </div>
    );
  }

  return (
    <Layout>
      <div class="p-4">
        <div class="flex">
          <h1 class="text-2xl font-bold mb-4">Mall Products</h1>{" "}
          <SearchInput searchInputHandle={() => {}} />
        </div>

        {/* 상품 목록 그리드 */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products().map((prod, index) => (
            <div
              class={`flex items-center h-32 ${
                prod.disable ? "opacity-30" : ""
              }`}
              onClick={() => {
                goToProduct(prod._id || "");
              }}
            >
              <div class="border border-gray-200 flex-none">
                <GetCloudFlareImage
                  imageId={prod.productPhotoId || ""}
                  sizeType={SizeType.THUMB_128}
                />
              </div>
              <div class="relative w-full h-full bg-gray-100">
                <div class="absolute flex items-center gap-2 top-0 p-1 text-gray-600">
                  <div class="text-xl">
                    {StorageTypeIconMapping[String(prod.storageType)]}
                  </div>
                  <div class="text-sm">{prod.weight}</div>
                </div>
                <p class="mt-2 text-sm text-center">{prod.name}</p>
                <div class="flex justify-center">
                  <span class="text-xs text-center">{prod.capacity}</span>
                  {prod.quantityInBox && (
                    <span class="text-xs text-center">
                      ×{prod.quantityInBox}
                    </span>
                  )}
                  {prod.quantityInPackage && (
                    <span class="text-xs text-center">
                      {`(${prod.quantityInPackage})`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {data()?.getMallProductDetailPages?.hasMore && (
          <div class="text-center mt-4" ref={loadMoreRef}></div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
