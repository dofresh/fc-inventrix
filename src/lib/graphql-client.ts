// src/lib/graphql-client.ts
import { GraphQLClient } from "graphql-request";

const API_URL =
  import.meta.env.VITE_GRAPHQL_URL || "http://localhost:4000/graphql";

// Next.js의 graphql 클라이언트 설정과 동일하게 맞추기
const gqlClient = new GraphQLClient(API_URL, {
  credentials: "include", // 중요: include 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export { gqlClient };
