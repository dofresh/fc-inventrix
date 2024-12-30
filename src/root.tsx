import { Component, createSignal, JSX } from "solid-js";
import { Header } from "~/components/header";
import { warehouseMenu } from "./routes/warehouseMenu";
import Sidebar from "~/components/sidebar";

interface RootLayoutProps {
  children: JSX.Element;
}

const Root: Component<RootLayoutProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="flex-grow">
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
};

export default Root;
