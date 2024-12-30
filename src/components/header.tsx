// src/components/Header.tsx
import { Component, createEffect, createSignal, For, Show } from "solid-js";
import { A } from "@solidjs/router";
import { createQuery, createMutation } from "@tanstack/solid-query";
import { useNavigate } from "@solidjs/router";
import { gqlClient } from "~/lib/graphql-client";
import { Dynamic } from "solid-js/web";
import { MenuType } from "~/contracts/types/menu";
import { queryClient } from "~/lib/querh-client";
import { FCFreshhadaLogoKr } from "~/svg/FCfreshhada_logo_kr";
import { FCLogo } from "~/svg/FC_logo";
import { UserIcon } from "~/svg/userIcon";
import { LogoutDocument, LogoutMutation } from "~/generated/graphql";
import { DropdownMenu } from "./DropdownMenu";
import {
  clearUserStore,
  getUserEmail,
  getUsername,
  isAuthenticated,
} from "~/stroes/userStrore";

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title?: string;
  menu: MenuType[];
}

export const Header: Component<Props> = (props) => {
  const [username, setUsername] = createSignal<string | undefined>();
  const navigate = useNavigate();

  // Logout Mutation
  const logoutMutation = createMutation(() => ({
    mutationFn: async () => {
      try {
        const response = await gqlClient.request<LogoutMutation>(
          LogoutDocument
        );
        return response;
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      clearUserStore(); // userStore 초기화 추가
      queryClient.setQueryData(["me"], { me: null });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/auth/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
    },
  }));

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  createEffect(() => {
    setUsername(getUsername());
    console.log("getUsername", getUsername());
  });

  return (
    <header class="h-[50px] w-full">
      <div class="flex flex-auto items-center mx-auto px-6 xl:container pt-3 pb-2">
        <div class="flex mx-auto flex-auto justify-between items-center relative">
          <div class="flex gap-4 md:gap-10 items-center">
            <div class="flex items-end mb-3 max-h-[80px] h-[30px] max-w-[100%] img-container">
              <A href="/">
                <div class="hidden md:flex bg-black">
                  <FCFreshhadaLogoKr width={110} fill="#fff" />
                </div>
                <div class="md:hidden bg-black">
                  <FCLogo width={28.5} fill="#fff" />
                </div>
              </A>

              <Show when={props.title}>
                <div class="ml-2 text-sm">{props.title}</div>
              </Show>
            </div>

            <Show when={import.meta.env.DEV}>
              <span class="text-red-400">개발자버전</span>
            </Show>

            {/* 모바일 매뉴 */}
            <div class="md:hidden">
              <div
                class={`overflow-y-auto scrollbar-hide flex gap-10 flex-col
                ${props.isOpen ? "block" : "hidden"}
                top-10 mt-5 bg-[#fff] w-full right-0 left-0 z-50 fixed bottom-0 px-10 py-10`}
              >
                <div
                  class="text-gray-800"
                  onClick={() => props.setIsOpen(false)}
                >
                  <ul>
                    <For each={props.menu}>
                      {(item) => (
                        <li>
                          <A class="link" href={item.url || ""}>
                            <Show when={item.Icon}>
                              <Dynamic
                                component={item.Icon}
                                class="min-w-max"
                                size={23}
                              />
                            </Show>
                            {item.name}
                          </A>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenu
          trigger={
            <div class="w-full flex flex-auto items-center justify-end h-[40px]">
              {/* Show 컴포넌트로 감싸서 사용 */}
              <Show when={username()}>
                <div>{username()}</div>
              </Show>
              <UserIcon width={22} />
            </div>
          }
        >
          <Show
            when={isAuthenticated()} // 조건 변경
            fallback={
              <div
                onClick={handleLogin}
                class="block px-4 py-2 cursor-pointer hover:bg-slate-100"
              >
                Login
              </div>
            }
          >
            <div
              onClick={handleLogout}
              class="block px-4 py-2 cursor-pointer hover:bg-slate-100"
            >
              Logout
            </div>
          </Show>
        </DropdownMenu>
        <div class="z-50 px-[10px] py-[5px] h-[40px] text-center rounded-md cursor-pointer md:hidden block">
          <button
            onClick={() => props.setIsOpen(!props.isOpen)}
            type="button"
            class="focus:outline-none"
            aria-controls="mobile-menu"
            aria-label="Mobile Menu"
            title="Mobile Menu"
          >
            <Show
              when={!props.isOpen}
              fallback={
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
            >
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Show>
          </button>
        </div>
      </div>
    </header>
  );
};
