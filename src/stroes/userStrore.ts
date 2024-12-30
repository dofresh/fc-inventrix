import { createStore, reconcile } from "solid-js/store";
import { User } from "~/generated/graphql";

interface UserStoreState {
  user: User | null;
}

// 초기 상태 설정
const initialState: UserStoreState = {
  user: null,
};

// store 생성
export const [userStore, setUserStore] =
  createStore<UserStoreState>(initialState);

// 유용한 helper 함수들
export const clearUserStore = () => {
  setUserStore("user", reconcile(null));
};

export const isAuthenticated = () => {
  return !!userStore.user;
};

export const getUserId = () => {
  return userStore.user?._id;
};

export const getUsername = () => {
  return userStore.user?.username;
};

export const getUserEmail = () => {
  return userStore.user?.email;
};
