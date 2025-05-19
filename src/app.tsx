import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { QueryClientProvider } from "@tanstack/solid-query";
import { queryClient } from "./lib/query-client";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { MetaProvider, Title, Meta } from "@solidjs/meta";
import { IsAuth } from "./components/IsAuth";

export default function App() {
  return (
    <MetaProvider>
      <Title>입고</Title>
      <Meta name="google" content="notranslate" />
      <QueryClientProvider client={queryClient}>
        <SolidQueryDevtools />
        <Router
          root={(props) => (
            <IsAuth>
              <Suspense>{props.children}</Suspense>
            </IsAuth>
          )}
        >
          <FileRoutes />
        </Router>
      </QueryClientProvider>
    </MetaProvider>
  );
}
