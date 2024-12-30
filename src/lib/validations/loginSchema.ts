import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export type LoginForm = yup.InferType<typeof loginSchema>;
