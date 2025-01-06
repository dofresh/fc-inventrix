import { Component, JSX, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { gqlClient } from "~/lib/graphql-client";
import { MeDocument, MeQuery, User } from "~/generated/graphql";
import { setUserStore } from "~/stroes/userStrore";
import { reconcile } from "solid-js/store";

interface IsAuthProps {
  children: JSX.Element;
}
// qid 쿠키 체크 함수
// qid 쿠키가 없으면 로그아웃 처리

export const IsAuth: Component<IsAuthProps> = (props) => {
  const navigate = useNavigate();

  const meQuery = createQuery(() => ({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await gqlClient.request<MeQuery>(MeDocument);
        // 사용자 정보를 store에 저장
        if (response.me) {
          console.log("Setting user store with:", response.me); // store에 저장되는 데이터 확인
          setUserStore("user", response.me as User);

          // store 업데이트 확인
          console.log("User store after update:");
        } else {
          navigate("/auth/login", { replace: true });
          return null;
        }
        return response;
      } catch (error) {
        console.error("meQuery error:", error); // 에러 확인
        setUserStore({ user: null });
        return { me: null };
      }
    },
    retry: false, // 재시도 비활성화
  }));

  // 새로고침 시 강제로 refetch 실행
  onMount(() => {
    if (!meQuery.isLoading && !meQuery.isFetching) {
      meQuery.refetch();
    }
  });

  if (meQuery.isError) {
    navigate("/auth/login", { replace: true });
    return null;
  }

  if (meQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return <>{props.children}</>;
};
