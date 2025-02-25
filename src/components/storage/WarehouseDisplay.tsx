import {
  Component,
  For,
  Index,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import StorageExcel from "../excel/storageExcel";

// 모델 타입 정의
type Item = {
  _id: string;
  quantity: number;
  storage: string;
  location: string;
  recodedDate: string;
  productCode: string;
  nickname: string;
  description: string;
  unit: string;
  sizeDES: string;
};

// location 문자열 파싱 타입
export type ParsedLocation = {
  storageAtCard: string;
  area: string;
  position: number;
  tier: number;
};

export type Grouped = { [storage: string]: { [area: string]: Item[] } };

// location 파싱 함수
export const parseLocation = (location: string): ParsedLocation => {
  const parts = location.split("-");
  if (parts.length === 1) {
    return {
      storageAtCard: "",
      area: "",
      position: parseInt(parts[0], 10),
      tier: 1,
    };
  } else if (parts.length === 2) {
    return {
      storageAtCard: parts[0],
      area: "",
      position: parseInt(parts[1], 10),
      tier: 1,
    };
  } else if (parts.length === 3) {
    return {
      storageAtCard: parts[0],
      area: parts[1],
      position: parseInt(parts[2], 10),
      tier: 1,
    };
  } else if (parts.length === 4) {
    return {
      storageAtCard: parts[0],
      area: parts[1],
      position: parseInt(parts[2], 10),
      tier: parseInt(parts[3], 10),
    };
  }
  return {
    storageAtCard: "",
    area: "",
    position: 0,
    tier: 1,
  };
};

// 아이템들을 storage와 area별로 그룹화
const groupItemsByStorageAndArea = (items: Item[]) => {
  const grouped: { [storage: string]: { [area: string]: Item[] } } = {};
  items.forEach((item) => {
    const { storageAtCard, area } = parseLocation(item.location);
    const storage = item.storage;
    if (!grouped[storage]) grouped[storage] = {};
    if (!grouped[storage][area]) grouped[storage][area] = [];
    grouped[storage][area].push(item);
  });
  return grouped;
};

// storage 탭에 선택된 storage의 내용을 렌더링하는 컴포넌트
const WarehouseContent: Component<{
  storageGroup: { [area: string]: Item[] };
  stroageId: string;
}> = (props) => {
  const [storage, setStorage] = createSignal<{ [area: string]: Item[] }>({});
  const [definedAreas, setDefinedAreas] = createSignal<string[]>([]);
  // area가 빈 경우는 헤더 없이 바로 렌더링
  // 미리 정의된 area 그룹 (빈 문자열은 제외)

  const slotCount = 20;
  // 층(단)은 내림차순 (예: 3,2,1)
  const tiers = [3, 2, 1];

  createEffect(() => {
    setStorage({ ...props.storageGroup });
    setDefinedAreas(Object.keys({ ...props.storageGroup }));
  });

  return (
    <div class="flex flex-col gap-4 mb-24">
      <Switch>
        <Match when={storage()[""]}>
          <div class="p-2">
            <For each={tiers}>
              {(tier) => {
                const tierItems = storage()
                  [""].filter(
                    (item) => parseLocation(item.location).tier === tier
                  )
                  .sort(
                    (a, b) =>
                      parseLocation(a.location).position -
                      parseLocation(b.location).position
                  );

                const slots = Array.from(
                  { length: slotCount },
                  (_, i) => i + 1
                );
                return (
                  <div class="mb-4">
                    <h4 class="font-medium">{tier} 단</h4>
                    <div class="grid grid-cols-[repeat(20,1fr)] gap-1">
                      <For each={slots}>
                        {(slot) => {
                          const item = tierItems.find(
                            (it) => parseLocation(it.location).position === slot
                          );
                          return (
                            <div class="w-32">
                              <div class="w-full border h-16 flex items-center justify-center text-xs">
                                {item ? (
                                  <div class="text-center">
                                    <p>{item.productCode}</p>
                                    <p>{item.nickname}</p>
                                    <Show when={item.quantity}>
                                      <p>Qty: {item.quantity}</p>
                                    </Show>
                                  </div>
                                ) : (
                                  <span class="text-gray-400">-</span>
                                )}
                              </div>
                              <div class="w-full text-center tracking-widest">
                                {tier === 1 && `${slot}`}
                              </div>
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </Match>
        <Match when={!storage()[""]}>
          <For each={definedAreas()}>
            {(area) => {
              const groupItems = storage()[area];
              if (!props.storageGroup[area]) return null;

              return (
                <div class="p-2">
                  <h3 class="text-xl font-semibold mb-2">{area}</h3>
                  <For each={tiers}>
                    {(tier) => {
                      const tierItems = groupItems
                        .filter(
                          (item) => parseLocation(item.location).tier === tier
                        )
                        .sort(
                          (a, b) =>
                            parseLocation(a.location).position -
                            parseLocation(b.location).position
                        );

                      const slots = Array.from(
                        { length: slotCount },
                        (_, i) => i + 1
                      );
                      return (
                        <div class="mb-4">
                          <h4 class="font-medium">{tier} 단</h4>
                          <div class="grid grid-cols-[repeat(20,1fr)] gap-1">
                            <For each={slots}>
                              {(slot) => {
                                const item = tierItems.find(
                                  (it) =>
                                    parseLocation(it.location).position === slot
                                );
                                return (
                                  <div class="w-32">
                                    <div class="w-full border h-16 flex items-center justify-center text-xs">
                                      <Show
                                        when={item}
                                        fallback={
                                          <span class="text-gray-400">-</span>
                                        }
                                      >
                                        <div class="text-center">
                                          <p>{item?.productCode}</p>
                                          <p>{item?.nickname}</p>
                                          <Show
                                            when={item?.quantity}
                                            fallback={
                                              <span class="text-gray-400">
                                                -
                                              </span>
                                            }
                                          >
                                            <p>Qty: {item?.quantity}</p>
                                          </Show>
                                        </div>
                                      </Show>
                                    </div>
                                    <div class="w-full text-center tracking-widest">
                                      {tier === 1 &&
                                        `${props.stroageId}-${area}-${slot}`}
                                    </div>
                                  </div>
                                );
                              }}
                            </For>
                          </div>
                        </div>
                      );
                    }}
                  </For>
                </div>
              );
            }}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

// Storage 탭 UI: 모든 storage 그룹을 탭 버튼으로 전환하여 선택된 storage의 내용을 보여줌
const StorageTabs: Component<{
  groupedItems: { [storage: string]: { [area: string]: Item[] } };
}> = (props) => {
  const storages = createMemo(() => Object.keys(props.groupedItems));
  const [activeStorage, setActiveStorage] = createSignal(storages()[0] || "");
  const [id, setId] = createSignal<string>();
  const activeStorageGroup = createMemo(
    () => props.groupedItems[activeStorage()]
  );

  console.log(storages());

  return (
    <div>
      {/* 탭 버튼 */}
      <div
        class="fixed z-50 top-[50px] bg-white"
        style={{ width: "calc(100vw - 120px)" }}
      >
        <div class="w-full flex justify-between py-4">
          <div class="flex gap-2 mb-4">
            <For each={storages()}>
              {(storageId) => (
                <button
                  class={`px-4 py-2 border rounded ${
                    activeStorage() === storageId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                  onClick={() => {
                    setActiveStorage(storageId);
                    setId(storageId);
                  }}
                >
                  {storageId ? `Storage ${storageId}` : "Storage 없음"}
                </button>
              )}
            </For>
          </div>
          <StorageExcel data={props.groupedItems} />
        </div>
      </div>
      {/* 선택된 storage에 해당하는 내용 렌더링 */}
      <div class="mt-24">
        <Show
          when={activeStorageGroup()}
          fallback={<div>선택된 Storage가 없습니다.</div>}
        >
          <For each={[activeStorage()]}>
            {() => (
              <Dynamic
                component={WarehouseContent}
                storageGroup={{ ...activeStorageGroup() }}
                stroageId={id() || ""}
              />
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

// 전체 창고 화면 컴포넌트: 아이템들을 그룹화한 후 StorageTabs 컴포넌트에 전달
const WarehouseDisplay: Component<{ items: Item[] }> = (props) => {
  const grouped = createMemo(() => groupItemsByStorageAndArea(props.items));
  // console.log("grouped", grouped);

  return (
    <div class="p-4">
      <StorageTabs groupedItems={grouped()} />
    </div>
  );
};

export default WarehouseDisplay;
