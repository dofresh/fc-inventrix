interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_HOME_URL: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WHAREHOUSE_CODE: string;
  readonly VITE_CLOUDFLARE_ACCOUNT_HASH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
