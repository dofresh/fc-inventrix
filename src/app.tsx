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
import Layout from "./components/Layout";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

export default function App() {
  const [isOpen, setIsOpen] = createSignal(false);
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Router
        root={(props) => (
          <IsAuth>
            <Suspense>
              <Layout> {props.children}</Layout>
            </Suspense>
          </IsAuth>
        )}
      >
        <FileRoutes />
      </Router>
    </QueryClientProvider>
  );
}
