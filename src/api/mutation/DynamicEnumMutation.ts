import { createMutation } from "@tanstack/solid-query";
import {
  CreateEnumCategoryMutation,
  CreateEnumCategoryDocument,
  AddEnumValueMutationVariables,
  AddEnumValueDocument,
  AddEnumValueMutation,
  UpdateEnumValueMutationVariables,
  UpdateEnumValueMutation,
  UpdateEnumValueDocument,
} from "~/generated/graphql";
import { gqlClient } from "~/lib/graphql-client";
import { queryClient } from "~/lib/query-client";

// ------------------------------
// 타입 정의
// ------------------------------
export type EnumCategoryForm = {
  name: string;
  description: string;
};

export type EnumValueForm = {
  value: string;
  label: string;
  description: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  invisible: boolean;
};

interface UseCreateEnumCategoryProps {
  onSuccess?: () => void;
  input: EnumCategoryForm;
}

export const useCreateEnumCategory = ({
  onSuccess,
}: UseCreateEnumCategoryProps) => {
  return createMutation(() => ({
    mutationFn: async (variables: {
      input: EnumCategoryForm;
    }): Promise<CreateEnumCategoryMutation["createEnumCategory"]> => {
      const res = await gqlClient.request<CreateEnumCategoryMutation>(
        CreateEnumCategoryDocument,
        variables
      );
      return res.createEnumCategory;
    },
    onSuccess: async (data) => {
      // 목록 갱신
      const result = await queryClient.invalidateQueries({
        queryKey: ["getAllEnumCategories"],
      });
      console.log("data", data);

      // 폼 리셋
      // 추가 성공 콜백 실행
      onSuccess?.();
    },
    onError: (err: any) => {
      console.error("Error creating category:", err);
    },
  }));
};

interface UseAddEnumValueMutationProps {
  onSuccess?: () => void;
  categoryId: AddEnumValueMutationVariables["categoryId"];
  input: AddEnumValueMutationVariables["input"];
}

export const useAddEnumValueMutation = ({
  onSuccess,
}: UseAddEnumValueMutationProps) => {
  return createMutation(() => ({
    mutationFn: async (variables: {
      input: AddEnumValueMutationVariables["input"];
      categoryId: AddEnumValueMutationVariables["categoryId"];
    }) => {
      const res = await gqlClient.request<
        AddEnumValueMutation,
        AddEnumValueMutationVariables
      >(AddEnumValueDocument, variables);
      return res.addEnumValue;
    },
    onSuccess: async () => {
      // 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: ["getAllEnumCategories"],
      });
      onSuccess?.();
    },
    onError: (err: any) => {
      console.error("Error adding enum value:", err);
    },
  }));
};

interface UseUpdateEnumValueMutationProps {
  onSuccess?: () => void;
  categoryId: UpdateEnumValueMutationVariables["categoryId"];
  valueId: UpdateEnumValueMutationVariables["valueId"];
  input: UpdateEnumValueMutationVariables["input"];
}
export const useUpdateEnumValueMutation = ({
  onSuccess,
}: UseUpdateEnumValueMutationProps) => {
  return createMutation(() => ({
    mutationFn: async (variables: {
      categoryId: string;
      valueId: string;
      input: EnumValueForm; // 실제 스키마에 맞춰야 함
    }) => {
      const res = await gqlClient.request<
        UpdateEnumValueMutation,
        UpdateEnumValueMutationVariables
      >(UpdateEnumValueDocument, variables);
      return res.updateEnumValue;
    },
    onSuccess: async () => {
      // 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: ["getAllEnumCategories"],
      });
      // 폼 리셋
    },
    onError: (err: any) => {
      console.error("Error updating enum value:", err);
    },
  }));
};
