import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Suspense } from "solid-js";
import "./app.css";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "./lib/querh-client";
import { Header } from "./components/header";
import { warehouseMenu } from "./routes/warehouseMenu";
import { Sidebar } from "./components/sidebar";
import { IsAuth } from "./components/IsAuth";

export default function App() {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Router
        root={(props) => (
          <IsAuth>
            <Suspense>
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
            </Suspense>
          </IsAuth>
        )}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
