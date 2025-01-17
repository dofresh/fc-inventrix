import { warehouseMenu } from "~/routes/warehouseMenu";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { createSignal, JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

function Layout(props: Props) {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <div>
      <Header
        isOpen={isOpen()}
        setIsOpen={setIsOpen}
        title="저장소"
        menu={warehouseMenu}
      />
      <div class="w-full min-h-[calc(100vh-50px)] flex gap-5 bg-slate-50">
        <Sidebar isOpen={isOpen()} menu={warehouseMenu} />
        <main class="w-full flex justify-center">
          <div class="max-w-5xl flex-1 py-4 text-gray-600 ml-4 md:ml-0 mr-4">
            {props.children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
