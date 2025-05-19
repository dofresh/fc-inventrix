import { useParams, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import { createQuery } from "@tanstack/solid-query";
import {
  MallProductDetailPageQuery,
  MallProductDetailPageDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";
import GetCloudFlareImage, {
  SizeType,
} from "~/components/cloudflare/getCloudFlareImage";
import Layout from "~/components/Layout";
import Spin from "~/components/Spin";
import { queryClient } from "~/lib/query-client";
import { StorageTypeIconMapping } from "~/lib/stroageTypeIconMapping";

const ProductInfo = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [decodedId, setDecodedId] = createSignal("");

  // URL 파라미터에서 ID 추출 및 디코딩
  createEffect(() => {
    try {
      const rawId = params.id
        ? params.id.includes("/")
          ? params.id.split("/")[0]
          : params.id
        : "";
      setDecodedId(decodeURIComponent(rawId));
    } catch (e) {
      console.error("ID 디코딩 실패:", e);
      setDecodedId(params.id);
    }
  });

  // 상품 데이터 쿼리
  const productQuery = createQuery(() => ({
    queryKey: ["mallProductDetailPage", decodedId()],
    queryFn: async () => {
      try {
        if (!decodedId()) return null;

        const response = await gqlClient.request<MallProductDetailPageQuery>(
          MallProductDetailPageDocument,
          { id: decodedId() }
        );

        return response.mallProductDetailPage;
      } catch (error) {
        console.error("Product query error:", error);
        return null;
      }
    },
    initialData: () => {
      // 캐시된 데이터가 있으면 사용
      const cachedData = queryClient.getQueryData<
        MallProductDetailPageQuery["mallProductDetailPage"]
      >(["mallProductDetailPage", decodedId()]);

      return cachedData || null;
    },
    enabled: !!decodedId(),
    refetchOnMount: true,
  }));

  // 제품 정보 추출
  const product = () => productQuery.data?.mallProductDetailPage;

  return (
    <Layout>
      <div class="flex flex-col justify-center mb-36">
        <main class="max-w-5xl flex-1 mx-auto py-4 text-gray-600">
          <Show
            when={!productQuery.isLoading}
            fallback={
              <div class="flex justify-center items-center h-64">
                <Spin isOpen={true} />
              </div>
            }
          >
            <Show
              when={product()}
              fallback={
                <div class="mt-12 text-center">
                  <div class="text-xl mb-4">상품 정보를 찾을 수 없습니다.</div>
                  <div class="text-sm text-gray-500 mb-8">
                    ID: {decodedId()}
                  </div>
                  <div class="flex justify-center gap-4">
                    <button
                      class="px-4 py-2 border-2 rounded-lg hover:bg-slate-100"
                      onClick={() => navigate("/mall/products")}
                    >
                      돌아가기
                    </button>
                    <button
                      class="px-4 py-2 border-2 rounded-lg hover:bg-slate-100"
                      onClick={() => productQuery.refetch()}
                    >
                      다시 시도
                    </button>
                  </div>
                </div>
              }
            >
              <div class="p-4">
                <div class="mb-4">
                  <button
                    class="px-4 py-1 border rounded-lg hover:bg-slate-100"
                    onClick={() => navigate("/mall/products")}
                  >
                    목록으로
                  </button>
                </div>

                <div class="flex flex-col md:flex-row">
                  {/* 이미지 섹션 */}
                  <div class="w-full md:w-1/2">
                    <GetCloudFlareImage
                      imageId={product()?.productPhotoId || ""}
                      sizeType={SizeType.THUMB_512}
                    />
                  </div>

                  {/* 상품 정보 섹션 */}
                  <div class="w-full md:w-1/2 md:pl-8 mt-6 md:mt-0">
                    <div class="flex items-center">
                      <h1 class="text-2xl font-bold">{product()?.name}</h1>
                      {product()?.disable && (
                        <span class="ml-2 px-2 py-1 bg-red-100 text-red-500 text-xs rounded">
                          비활성화됨
                        </span>
                      )}
                    </div>

                    <div class="mt-4 flex items-center gap-2">
                      <div class="text-xl">
                        {StorageTypeIconMapping[String(product()?.storageType)]}
                      </div>
                      <div class="text-sm text-gray-500">
                        보관 유형: {product()?.storageType}
                      </div>
                    </div>

                    <div class="mt-4 grid grid-cols-2 gap-4">
                      {product()?.productCode && (
                        <div class="border-b pb-2">
                          <span class="font-medium">상품 코드:</span>{" "}
                          {product()?.productCode}
                        </div>
                      )}

                      {product()?.productItemCode && (
                        <div class="border-b pb-2">
                          <span class="font-medium">품목 코드:</span>{" "}
                          {product()?.productItemCode}
                        </div>
                      )}

                      {product()?.weight && (
                        <div class="border-b pb-2">
                          <span class="font-medium">무게:</span>{" "}
                          {product()?.weight}
                        </div>
                      )}

                      <div class="border-b pb-2">
                        <span class="font-medium">용량:</span>
                        {product()?.capacity}
                        {product()?.quantityInBox && (
                          <span>×{product()?.quantityInBox}</span>
                        )}
                        {product()?.quantityInPackage && (
                          <span>{` (${product()?.quantityInPackage})`}</span>
                        )}
                      </div>

                      {product()?.storageMethod && (
                        <div class="border-b pb-2">
                          <span class="font-medium">보관 방법:</span>{" "}
                          {product()?.storageMethod}
                        </div>
                      )}
                    </div>

                    {/* 제품 추가 정보 */}
                    {product()?.productInfo && (
                      <div class="mt-8">
                        <h2 class="text-lg font-bold mb-2">상품 설명</h2>
                        <div class="p-4 bg-gray-50 rounded-lg">
                          {product()?.productInfo}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Show>
          </Show>
        </main>
      </div>
    </Layout>
  );
};

export default ProductInfo;
