import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 3000,
  },
  define: {
    "process.env.VITE_GRAPHQL_URL": JSON.stringify(
      process.env.VITE_GRAPHQL_URL
    ),
  },
});
