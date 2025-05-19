import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
  server: {
    // Cloudflare Pages specific configuration
    preset: "cloudflare-pages",
  }
});
