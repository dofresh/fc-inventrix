import { warehouseMenu } from "~/routes/warehouseMenu";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { createSignal, JSXElement, Show } from "solid-js";

interface Props {
  children: JSXElement;
  wide?: boolean;
}

function Layout(props: Props) {
  // 브라우저 환경에서 localStorage로부터 초기 상태 읽기
  const getInitialState = () => {
    if (typeof window !== "undefined") {
      // console.log("localStorage.getItem", localStorage.getItem("sidebarOpen"));

      return localStorage.getItem("sidebarOpen") === "true";
    }
    return false;
  };

  // createSignal을 사용해 사이드바의 열림 상태를 관리합니다.
  const [isOpen, setIsOpen] = createSignal(getInitialState());

  return (
    <div class="fixed inset-0 flex flex-col">
      <Header
        isOpen={isOpen()}
        setIsOpen={setIsOpen}
        title="저장소"
        menu={warehouseMenu}
      />
      <div class="flex-1 flex gap-5 bg-slate-50 overflow-hidden">
        <Sidebar isOpen={isOpen()} menu={warehouseMenu} />
        <main class="flex-1 overflow-auto">
          <Show
            when={props.wide}
            fallback={
              <div class="max-w-5xl mx-auto py-4 text-gray-600 px-4">
                {props.children}
              </div>
            }
          >
            <div class="mx-auto py-4 text-gray-600 px-4">{props.children}</div>
          </Show>
        </main>
      </div>
    </div>
  );
}

export default Layout;
