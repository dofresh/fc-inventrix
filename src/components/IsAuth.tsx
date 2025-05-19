// ~/components/IsAuth.tsx
import { Component, JSX, Show, createEffect, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { MeQuery } from "~/generated/graphql";
import { useMe } from "~/api/query/useMe";
import { queryClient } from "~/lib/query-client";
import { effect } from "solid-js/web";

interface IsAuthProps {
  children: JSX.Element;
}

export const IsAuth: Component<IsAuthProps> = (props) => {
  const meQuery = useMe();

  return (
    <Show when={!meQuery.isLoading} fallback={<div>Loading...</div>}>
      {props.children}
    </Show>
  );
};
