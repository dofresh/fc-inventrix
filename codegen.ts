import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: import.meta.env.VITE_GRAPHQL_URL,
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "./src/generated/graphql.ts": {
      // 단일 파일로 생성
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        dedupeFragments: true,
        skipTypename: true, // typename 필드 제외
        scalars: {
          DateTime: "string",
        },
        avoidOptionals: true,
        maybeValue: "T",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
