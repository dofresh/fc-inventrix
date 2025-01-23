// ~/components/IsAuth.tsx
import { Component, JSX, onMount, Show, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { gqlClient } from "~/lib/graphql-client";
import { MeDocument, MeQuery, User } from "~/generated/graphql";
import { setUserStore } from "~/stroes/userStrore";
import { getRequestEvent } from "solid-js/web";
import { useMe } from "~/api/query/useMe";
import { queryClient } from "~/lib/querh-client";

interface IsAuthProps {
  children: JSX.Element;
}

export const IsAuth: Component<IsAuthProps> = (props) => {
  const navigate = useNavigate();

  const meQuery = useMe();
  const meData = queryClient.getQueryData<MeQuery>(["me"]);

  createEffect(() => {
    if (meQuery.isError) {
      navigate("/auth/login", { replace: true });
    }
  });

  return (
    <Show when={!meQuery.isLoading} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
};
