import { GraphQLClient } from "graphql-request";
import { isServer } from "solid-js/web";

const endpoint = import.meta.env.VITE_GRAPHQL_URL;

export const gqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
  },
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    if (!init) return fetch(input);

    const { credentials, ...restOptions } = init;

    // 서버 사이드에서는 쿠키 처리를 건너뜁니다
    if (isServer) {
      return fetch(input, restOptions);
    }

    // 클라이언트 사이드에서만 쿠키를 처리합니다
    return fetch(input, {
      ...restOptions,
      headers: {
        ...restOptions.headers,
        ...(document.cookie.includes("qid") && {
          Cookie: document.cookie
            .split("; ")
            .find((row) => row.startsWith("qid=")),
        }),
      },
    });
  },
});
