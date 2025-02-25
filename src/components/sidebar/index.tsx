import { Component, createSignal, createEffect, For, Show } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { A } from "@solidjs/router";
import { MenuType } from "~/contracts/types/menu";
import { Dynamic } from "solid-js/web";
import ArrowExpandButton from "./arrowExpandButton";

interface SidebarProps {
  isOpen: boolean;
  menu: MenuType[];
}

export const Sidebar: Component<SidebarProps> = (props) => {
  const [expand, setExpand] = createSignal(props.isOpen);

  // props.isOpen이 변경될 때 expand 값도 업데이트
  createEffect(() => {
    setExpand(props.isOpen);
  });

  return (
    <div class="hidden w- md:block bg-white text-gray-900 shadow-xl z-[999] overflow-hidden md:relative fixed">
      <Presence exitBeforeEnter initial={false}>
        <Motion
          initial={props.isOpen ? "16rem" : "4rem"}
          animate={{
            width: expand() ? "16rem" : "4rem",
            transition: {
              duration: 0.3,
              easing: [0.4, 0, 0.2, 1], // ease-out 베지어 곡선
            },
          }}
          class="w-0"
        >
          {/* 컨트롤 버튼 */}
          <ArrowExpandButton expand={expand()} setExpand={setExpand} />

          {/* 메뉴 */}
          <div class="flex flex-col h-full">
            <ul class="whitespace-pre px-5 text-[0.9rem] py-5 flex flex-col font-medium overflow-x-hidden gap-4">
              <For each={props.menu}>
                {(item) => (
                  <Show
                    when={!item.isSeperate}
                    fallback={
                      <div
                        class={
                          item.isSeperate ? "border-b border-gray-200" : ""
                        }
                      ></div>
                    }
                  >
                    <li>
                      <A class="flex gap-6" href={item.url || ""}>
                        <Show when={item.Icon}>
                          <Dynamic
                            component={item.Icon}
                            class={`min-w-max ${
                              item.iconRevers ? "-scale-x-100" : ""
                            }`}
                            size={23}
                          />
                        </Show>
                        {item.name}
                      </A>
                    </li>
                  </Show>
                )}
              </For>
            </ul>
          </div>
        </Motion>
      </Presence>
    </div>
  );
};
