import { GraphQLClient } from "graphql-request";
import { getRequestEvent } from "solid-js/web";

const endpoint = import.meta.env.VITE_GRAPHQL_URL;

export const gqlClient = new GraphQLClient(endpoint, {
  credentials: "include",
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const event = getRequestEvent();

    let response;
    // SSR일 때는 원본 요청의 헤더를 전달
    if (event) {
      response = await fetch(input, {
        ...init,
        headers: {
          ...init?.headers,
          ...Object.fromEntries(event.request.headers),
        },
      });
    } else {
      // 클라이언트 사이드에서는 기본 fetch 동작 사용
      response = await fetch(input, {
        ...init,
        credentials: "include",
      });
    }

    // 응답 데이터 확인
    const data = await response.json();

    // GraphQL 에러 체크
    if (
      data.errors?.some((error: any) =>
        error.message.includes("not authenticated")
      )
    ) {
      if (typeof window !== "undefined") {
        window.location.href = "/404";
      }
      // 404 상태의 응답 반환
      return new Response(JSON.stringify(data), { status: 404 });
    }

    // 정상 응답 반환
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: response.headers,
    });
  },
});
