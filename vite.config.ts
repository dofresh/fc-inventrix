import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 3000, // 개발 서버 포트
  },
  define: {
    "process.env.VITE_GRAPHQL_URL": JSON.stringify(
      process.env.VITE_GRAPHQL_URL
    ),
  },
  build: {
    outDir: "dist", // 빌드 결과가 저장될 경로
    target: "esnext", // Cloudflare와 호환성을 위해 최신 JavaScript 사용
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]"
      },
    },
    // Ensure SSR-compatible builds for Cloudflare Pages
    ssr: true,
    // Minimize the bundle size
    minify: true,
    // Ensure proper sourcemaps for debugging
    sourcemap: true
  },
});
