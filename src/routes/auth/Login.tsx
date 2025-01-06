// src/routes/auth/login.tsx
import { Component, createSignal, Show } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import { createMutation } from "@tanstack/solid-query";
import { gqlClient } from "~/lib/graphql-client";
import * as yup from "yup";
import { LoginDocument, LoginMutation } from "~/generated/graphql";
import { createStore } from "solid-js/store";
import { queryClient } from "~/lib/querh-client";
import { Field } from "~/components/Field";
import { setUserStore } from "~/stroes/userStrore";

// Form 타입 정의
type LoginForm = {
  usernameOrEmail: string;
  password: string;
};

// Yup validation schema
const loginSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("이름 또는 이메일을 입력하세요"),
  password: yup.string().required("비밀번호를 입력하세요"),
});

const Login: Component = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = createSignal<Record<string, string>>({});
  const [form, setForm] = createStore<LoginForm>({
    usernameOrEmail: "",
    password: "",
  });

  // Login mutation
  const loginMutation = createMutation(() => ({
    mutationFn: async (values: LoginForm) => {
      const response = await gqlClient.request<LoginMutation>(
        LoginDocument,
        values
      );
      return response;
    },
    onSuccess: (data) => {
      if (data.login.user) {
        queryClient.setQueryData(["me"], {
          me: data.login.user,
        });
        setUserStore("user", data.login.user);
        navigate("/");
      }
      if (data.login.errors) {
        setErrors(
          data.login.errors.reduce(
            (acc, err) => ({
              ...acc,
              [err.field]: err.message,
            }),
            {}
          )
        );
      }
    },
  }));

  // Form submission handler
  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    try {
      await loginSchema.validate(form, { abortEarly: false });
      await loginMutation.mutateAsync(form);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(
          err.inner.reduce(
            (acc, err) => ({
              ...acc,
              [err.path!]: err.message,
            }),
            {}
          )
        );
      }
    }
  };

  return (
    <div class="w-full mt-48">
      <div class="px-4 flex justify-center h-full w-full">
        <div class="flex content-center items-center justify-center w-full md:max-w-lg">
          <div class="px-4 w-full">
            <div class="relative flex flex-col break-words w-full mb-6 shadow-lg rounded-lg bg-slate-200 border-0">
              <div class="rounded-t mb-0 px-6 py-6">
                <div class="text-center mb-3">
                  <h6 class="text-slate-500 text-sm font-bold">
                    프레시하다 FC
                  </h6>
                </div>
                <hr class="mt-6 border-b-1 border-slate-300" />
              </div>

              <div class="px-4 md:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit}>
                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-slate-600 text-xs font-bold mb-2"
                      for="usernameOrEmail"
                    >
                      이름 또는 이메일
                    </label>
                    <Field
                      type="text"
                      id="usernameOrEmail"
                      name="usernameOrEmail"
                      value={form.usernameOrEmail}
                      onInput={(e) =>
                        setForm("usernameOrEmail", e.currentTarget.value)
                      }
                      error={errors().usernameOrEmail}
                    />
                  </div>

                  <div class="relative w-full mb-3">
                    <label
                      class="block uppercase text-slate-600 text-xs font-bold mb-2"
                      for="password"
                    >
                      비밀번호
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      value={form.password}
                      onInput={(e) =>
                        setForm("password", e.currentTarget.value)
                      }
                      error={errors().password}
                    />
                  </div>

                  <div class="text-center mt-6">
                    <button
                      type="submit"
                      disabled={loginMutation.isPending}
                      class="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    >
                      {loginMutation.isPending ? "로그인 중..." : "로그인"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div class="flex flex-wrap mt-6 relative">
              <div>
                <A href="/auth/forgotPassword" class="text-slate-200">
                  <small>비밀번호를 잊으셨나요?</small>
                </A>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
