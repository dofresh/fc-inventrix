// src/guards/AuthGuard.tsx
import { Component, JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";

interface AuthGuardProps {
  children: JSX.Element;
}

const AuthGuard: Component<AuthGuardProps> = (props) => {
  const navigate = useNavigate();

  // 쿠키 존재 여부만 확인
  const checkAuth = () => {
    // document.cookie가 비어있으면 쿠키가 없는 것
    if (!document.cookie.includes("qid=")) {
      navigate("/login", { replace: true });
      return false;
    }
    return true;
  };

  const isAuthenticated = checkAuth();

  return <>{isAuthenticated && props.children}</>;
};

export default AuthGuard;
