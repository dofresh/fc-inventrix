// ~/routes/warehouse/[location].tsx
import { useParams, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import { createQuery, createMutation } from "@tanstack/solid-query";
import Spin from "~/components/Spin";
import {
  StockItem,
  EcountProduct,
  User,
  GetRackStDocument,
  GetRackStQuery,
  UpsertRackMutation,
  UpsertRackDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";
import LocationCode from "~/components/warehous/location/inputRack";
import Stock, { StockType } from "~/components/warehous/location/stockItem";
import { queryClient } from "~/lib/querh-client";
export type RackType = {
  location: string;
  stockItems: StockItem[];
  ExpirationDate?: string;
  _id: string;
  description?: string;
  ecountProduct?: EcountProduct;
  name?: string;
  quantity?: number;
  rackId?: string;
  recorder?: User;
  timestamp: string;
};

const WarehousePage = () => {
  const params = useParams<{ location: string }>();
  const navigate = useNavigate();
  const [decodedLocation, setDecodedLocation] = createSignal(params.location);
  const [showSubmit, setShowSubmit] = createSignal(true);
  const [pallets, setPallets] = createSignal<string[]>([]);
  const [rack, setRack] = createSignal<RackType>();

  // Rack 데이터 쿼리
  const rackQuery = createQuery(() => ({
    queryKey: ["rack", decodedLocation()],
    queryFn: async () => {
      try {
        const response = await gqlClient.request<GetRackStQuery>(
          GetRackStDocument,
          {
            input: { location: decodedLocation() },
          }
        );

        // 응답이 없거나 getRackST가 없는 경우 기본값 반환
        if (!response || !response.getRackST) {
          return {
            rack: null,
            stockItems: [],
            totalQuantities: [],
          };
        }

        const { getRackST } = response;

        // 상태 업데이트
        if (getRackST.rack) {
          setRack(getRackST.rack as RackType);
        }

        if (getRackST.stockItems) {
          const palletCodes = getRackST.stockItems
            .filter((item) => item?.palletCode)
            .map((item) => item.palletCode as string);
          setPallets(palletCodes);
        }

        // 반드시 전체 getRackST 객체를 반환
        return getRackST;
      } catch (error) {
        console.error("Rack query error:", error);
        // 에러 시 기본값 반환
        return {
          rack: null,
          stockItems: [],
          totalQuantities: [],
        };
      }
    },
    initialData: () => {
      const cachedData = queryClient.getQueryData<GetRackStQuery["getRackST"]>([
        "rack",
        decodedLocation(),
      ]);

      // 캐시된 데이터가 있으면 사용
      if (cachedData) {
        if (cachedData.rack) {
          setRack(cachedData.rack as RackType);
        }
        if (cachedData.stockItems) {
          const palletCodes = cachedData.stockItems
            .filter((item) => item?.palletCode)
            .map((item) => item.palletCode as string);
          setPallets(palletCodes);
        }
        return cachedData;
      }

      // 캐시된 데이터가 없으면 기본값 반환
      return {
        rack: null,
        stockItems: [],
        totalQuantities: [],
      };
    },
    enabled: true,
  }));
  // Rack mutation
  const rackMutation = createMutation(() => ({
    mutationFn: async (input: { location: string }) => {
      const response = await gqlClient.request<UpsertRackMutation>(
        UpsertRackDocument,
        {
          input,
        }
      );
      return response.upsertRack;
    },
    onSuccess: (data) => {
      if (data.rack?.location) {
        setRack(data.rack as RackType);
        navigate(`/warehouse/${data.rack.location}`, { replace: true });
      }
    },
  }));

  createEffect(() => {
    setDecodedLocation(decodeURIComponent(params.location));
  }, [params.location]);

  const createRackHandle = () => {
    rackMutation.mutate({ location: decodedLocation() });
  };

  return (
    <div class="flex flex-col justify-center">
      <main class="max-w-5xl flex-1 mx-auto py-4 text-gray-600">
        <div>
          <div class="flex flex-col items-center w-full">
            <LocationCode
              location={decodedLocation()}
              showSubmit={showSubmit()}
              setShowSubmit={setShowSubmit}
              loading={rackQuery.isLoading}
            />
            <Show
              when={!rackQuery.isLoading || !rackMutation.isPending}
              fallback={<Spin isOpen={true} />}
            >
              <Show
                when={!rackQuery.isLoading}
                fallback={<Spin isOpen={true} />}
              >
                <Show
                  when={rack() && rack}
                  fallback={
                    <div class="mt-48">
                      {/* <div class="text-center mb-12">{decodedLocation()}</div> */}
                      <div class="flex gap-4">
                        <button class="" onClick={() => navigate(-1)}>
                          <div
                            class={`w-[6rem] cursor-pointer inline-block border-4 p-2 rounded-lg ${
                              rackQuery.isLoading && "border-slate-400"
                            }`}
                          >
                            취소
                          </div>
                        </button>
                        <button class="" onClick={createRackHandle}>
                          <div
                            class={`w-[6rem] cursor-pointer inline-block border-4 p-2 rounded-lg ${
                              rackQuery.isLoading && "border-slate-400"
                            }`}
                          >
                            생성
                          </div>
                        </button>
                      </div>
                    </div>
                  }
                >
                  {showSubmit() && (
                    <div>
                      <div class="flex justify-center text-4xl font-weight-900">
                        {decodedLocation()}
                      </div>
                      <Stock
                        pallets={pallets()}
                        locationStockItems={
                          rackQuery.data?.stockItems as
                            | StockType[]
                            | null
                            | undefined
                        }
                        rackId={rack()?._id}
                        location={decodedLocation()}
                        prodTotalQuantities={rackQuery.data?.totalQuantities}
                      />
                    </div>
                  )}
                </Show>
              </Show>
            </Show>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WarehousePage;
