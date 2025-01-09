// ~/components/IsAuth.tsx
import { Component, JSX, onMount, Show, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { gqlClient } from "~/lib/graphql-client";
import { MeDocument, MeQuery, User } from "~/generated/graphql";
import { setUserStore } from "~/stroes/userStrore";

interface IsAuthProps {
  children: JSX.Element;
}

export const IsAuth: Component<IsAuthProps> = (props) => {
  const navigate = useNavigate();

  const meQuery = createQuery(() => ({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await gqlClient.request<MeQuery>(MeDocument);
        if (response.me) {
          console.log("Setting user store with:", response.me);
          setUserStore("user", response.me as User);
          return response;
        }
        // navigate("/auth/login", { replace: true });
        return null;
      } catch (error) {
        console.error("meQuery error:", error);
        setUserStore({ user: null });
        throw error;
      }
    },
    retry: false,
  }));

  // 새로고침 시 refetch 유지
  // onMount(() => {
  //   if (!meQuery.isLoading && !meQuery.isFetching) {
  //     meQuery.refetch();
  //   }
  // });

  createEffect(() => {
    if (meQuery.isError) {
      navigate("/auth/login", { replace: true });
    }
  });

  return (
    <Show
      when={!meQuery.isLoading && !meQuery.isError}
      fallback={<div>Loading...</div>}
    >
      {props.children}
    </Show>
  );
};
