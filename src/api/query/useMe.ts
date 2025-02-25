import { useNavigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { MeQuery, MeDocument } from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";

export const useMe = () => {
  const navigate = useNavigate();

  return createQuery(() => ({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await gqlClient.request<MeQuery>(MeDocument);
        if (response.me) {
          // console.log("Setting user store with:", response.me);
          return response;
        }
        navigate("/auth/login", { replace: true });
        return null;
      } catch (error) {
        // console.error("meQuery error:", error);

        throw error;
      }
    },
    staleTime: 0, // 매번 최신 데이터 확인
    refetchOnWindowFocus: true,
    retry: false, // 인증 실패 시 불필요한 재시도를 막음
  }));
};
