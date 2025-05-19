import { Component, createEffect, createSignal, Index, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import * as yup from "yup";

// 예시로 작성한 Field 컴포넌트 import (Login.tsx 처럼 Field를 사용하신다면)
import { Field } from "~/components/Field";
import { useGetAllEnumCategories } from "~/api/query/DynamicEnumQuery";
import {
  useAddEnumValueMutation,
  useCreateEnumCategory,
  useUpdateEnumValueMutation,
} from "~/api/mutation/DynamicEnumMutation";

// ------------------------------
// 타입 정의
// ------------------------------
type EnumCategoryForm = {
  name: string;
  description: string;
};

type EnumValueForm = {
  value: string;
  label: string;
  description: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  invisible: boolean;
};

// ------------------------------
// Yup Schema 정의 (예시)
// ------------------------------
const enumCategorySchema = yup.object().shape({
  name: yup.string().required("카테고리 이름을 입력하세요"),
  description: yup.string().required("카테고리 설명을 입력하세요"),
});

const enumValueSchema = yup.object().shape({
  value: yup.string().required("Value를 입력하세요"),
  label: yup.string().required("Label을 입력하세요"),
  description: yup.string(),
  color: yup.string(),
  isActive: yup.boolean(),
  sortOrder: yup.number(),
});

// ------------------------------
// 컴포넌트
// ------------------------------
const EnumManager: Component = () => {
  const navigate = useNavigate();

  // 에러 객체 관리
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  // 선택된 카테고리 ID
  const [selectedCategoryId, setSelectedCategoryId] = createSignal<string>("");

  // 카테고리 생성 폼
  const [categoryForm, setCategoryForm] = createStore<EnumCategoryForm>({
    name: "",
    description: "",
  });

  // 값(enum value) 생성/수정 폼
  const [valueForm, setValueForm] = createStore<EnumValueForm>({
    value: "",
    label: "",
    description: "",
    color: "#333333",
    isActive: true,
    sortOrder: 0,
    invisible: true,
  });

  // 현재 수정 중인 value의 ID (null이면 신규 추가 모드)
  const [editingValueId, setEditingValueId] = createSignal<string | null>(null);

  // ------------------------------
  // 1) 카테고리 목록 조회 (createQuery)
  // ------------------------------
  const enumCategoriesQuery = useGetAllEnumCategories();

  // 현재 선택된 카테고리 정보
  const currentCategory = () =>
    enumCategoriesQuery.data?.find((cat) => cat._id === selectedCategoryId());

  // ------------------------------
  // 2) 카테고리 생성 뮤테이션
  // ------------------------------
  const createCategoryMutation = useCreateEnumCategory({
    input: categoryForm,
    onSuccess: async () => {
      setCategoryForm({ name: "", description: "" });
      setErrors({});
    },
  });

  // ------------------------------
  // 3) Enum Value 추가 뮤테이션
  // ------------------------------
  const addValueMutation = useAddEnumValueMutation({
    categoryId: selectedCategoryId(),
    input: {
      ...valueForm,
    },
    onSuccess: async () => {
      // 폼 리셋
      setValueForm({
        value: "",
        label: "",
        description: "",
        color: "#333333",
        isActive: true,
        sortOrder: 0,
        invisible: true,
      });
      setEditingValueId(null);
      setErrors({});
    },
  });

  // ------------------------------
  // 4) Enum Value 수정 뮤테이션
  // ------------------------------

  const updateValueMutation = useUpdateEnumValueMutation({
    categoryId: selectedCategoryId(),
    valueId: editingValueId() || "",
    input: valueForm,
    onSuccess: async () => {
      setValueForm({
        value: "",
        label: "",
        description: "",
        color: "#333333",
        isActive: true,
        sortOrder: 0,
      });
      setEditingValueId(null);
      setErrors({});
    },
  });

  // ------------------------------
  // 5) Enum Value 삭제 뮤테이션
  // ------------------------------
  //   const deleteValueMutation = createMutation(() => ({
  //     mutationFn: async (vars: { categoryId: string; valueId: string }) => {
  //       const res = await gqlClient.request<
  //         DeleteEnumValueMutation,
  //         DeleteEnumValueMutationVariables
  //       >(DeleteEnumValueDocument, {
  //         categoryId: vars.categoryId,
  //         valueId: vars.valueId,
  //       });
  //       return res.deleteEnumValue;
  //     },
  //     onSuccess: async () => {
  //       // 목록 갱신
  //       await queryClient.invalidateQueries({
  //         queryKey: ["getAllEnumCategories"],
  //       });
  //     },
  //     onError: (err: any) => {
  //       console.error("Error deleting enum value:", err);
  //     },
  //   }));

  // ------------------------------
  // 이벤트 핸들러
  // ------------------------------
  // (A) 카테고리 생성
  const handleCreateCategory = async (e: Event) => {
    e.preventDefault();
    try {
      // Yup 검증
      await enumCategorySchema.validate(categoryForm, { abortEarly: false });
      // 생성 뮤테이션
      await createCategoryMutation.mutateAsync({ input: { ...categoryForm } });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(
          err.inner.reduce(
            (acc, valErr) => ({
              ...acc,
              [valErr.path!]: valErr.message,
            }),
            {}
          )
        );
      }
    }
  };

  // (B) 값 추가/수정
  const handleValueSubmit = async (e: Event) => {
    e.preventDefault();
    if (!selectedCategoryId()) return;

    try {
      // Yup 검증
      await enumValueSchema.validate(valueForm, { abortEarly: false });

      if (!editingValueId()) {
        // 신규 추가
        await addValueMutation.mutateAsync({
          categoryId: selectedCategoryId(),
          input: { ...valueForm },
        });
      } else {
        // 수정
        await updateValueMutation.mutateAsync({
          categoryId: selectedCategoryId(),
          valueId: editingValueId()!,
          input: { ...valueForm },
        });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors(
          err.inner.reduce(
            (acc, valErr) => ({
              ...acc,
              [valErr.path!]: valErr.message,
            }),
            {}
          )
        );
      }
    }
  };

  // (C) 값 삭제
  const handleDeleteValue = async (valueId: string) => {
    if (!window.confirm("이 값을 정말 삭제하시겠습니까?")) return;
    if (!selectedCategoryId()) return;

    await updateValueMutation.mutateAsync({
      categoryId: selectedCategoryId(),
      valueId,
      input: { ...valueForm, invisible: true },
    });
  };

  // (D) 수정 시작
  const startEditing = (val: {
    _id: string;
    value: string;
    label: string;
    description?: string;
    color?: string;
    isActive: boolean;
    sortOrder: number;
  }) => {
    setEditingValueId(val._id);
    setValueForm({
      value: val.value,
      label: val.label,
      description: val.description || "",
      color: val.color || "#333333",
      isActive: val.isActive,
      sortOrder: val.sortOrder,
    });
  };

  // (E) 수정 취소
  const cancelEditing = () => {
    setEditingValueId(null);
    setValueForm({
      value: "",
      label: "",
      description: "",
      color: "#333333",
      isActive: true,
      sortOrder: 0,
    });
    setErrors({});
  };

  createEffect(() => {
    console.log();
  });

  // ------------------------------
  // 컴포넌트 JSX
  // ------------------------------
  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">
        Dynamic Enum Manager (SolidJS 예시)
      </h1>

      {/* 카테고리 목록 및 생성 폼 */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 카테고리 목록 */}
        <div class="border rounded p-4 overflow-auto max-h-96">
          <h2 class="font-semibold mb-2">Categories</h2>
          <Show
            when={!enumCategoriesQuery.isLoading}
            fallback={<p>Loading...</p>}
          >
            <Show
              when={
                enumCategoriesQuery.data && enumCategoriesQuery.data.length > 0
              }
              fallback={<p class="text-gray-500">아직 카테고리가 없습니다.</p>}
            >
              <ul class="space-y-2">
                <Index each={enumCategoriesQuery.data}>
                  {(category) => (
                    <li
                      class={`p-2 cursor-pointer rounded ${
                        selectedCategoryId() === category()._id
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCategoryId(category()._id)}
                    >
                      <div class="font-medium">{category().name}</div>
                      <div class="text-sm text-gray-600">
                        {category().description}
                      </div>
                    </li>
                  )}
                </Index>
              </ul>
            </Show>
          </Show>
        </div>

        {/* 카테고리 생성 폼 */}
        <div class="border rounded p-4">
          <h2 class="font-semibold mb-2">Create Category</h2>
          <form onSubmit={handleCreateCategory}>
            <div class="mb-3">
              <label class="block text-sm font-medium mb-1" for="name">
                Name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                value={categoryForm.name}
                onInput={(e) => setCategoryForm("name", e.currentTarget.value)}
                error={errors().name}
              />
            </div>

            <div class="mb-3">
              <label class="block text-sm font-medium mb-1" for="description">
                Description
              </label>
              <Field
                id="description"
                name="description"
                type="text"
                value={categoryForm.description}
                onInput={(e) =>
                  setCategoryForm("description", e.currentTarget.value)
                }
                error={errors().description}
              />
            </div>

            <button
              type="submit"
              disabled={createCategoryMutation.isPending}
              class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {createCategoryMutation.isPending
                ? "Creating..."
                : "Create Category"}
            </button>
          </form>
        </div>
      </div>

      {/* 선택된 카테고리가 있을 때만 값 목록/추가/수정 폼 표시 */}
      <Show when={selectedCategoryId() && currentCategory()}>
        <div class="mt-8">
          <h2 class="text-xl font-semibold mb-4">
            Values for: {currentCategory()?.name}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 값 목록 */}
            <div class="border rounded p-4">
              <h3 class="font-medium mb-2">Available Values</h3>
              <Show
                when={
                  currentCategory()?.values &&
                  currentCategory()!.values.length > 0
                }
                fallback={<p class="text-gray-500">No values yet. Add some!</p>}
              >
                <div class="overflow-x-auto">
                  <table class="min-w-full">
                    <thead>
                      <tr class="bg-gray-50">
                        <th class="px-4 py-2 text-left">Value</th>
                        <th class="px-4 py-2 text-left">Label</th>
                        <th class="px-4 py-2 text-left">Status</th>
                        <th class="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Index
                        each={[...currentCategory()!.values].sort(
                          (a, b) => a.sortOrder - b.sortOrder
                        )}
                      >
                        {(val) => (
                          <tr class="border-t">
                            <td class="px-4 py-2">{val().value}</td>
                            <td class="px-4 py-2">{val().label}</td>
                            <td class="px-4 py-2">
                              <span
                                class={`px-2 py-1 rounded text-xs ${
                                  val().isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {val().isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td class="px-4 py-2 space-x-2">
                              <button
                                onClick={() => startEditing(val())}
                                class="text-blue-500 hover:text-blue-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteValue(val()._id)}
                                class="text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )}
                      </Index>
                    </tbody>
                  </table>
                </div>
              </Show>
            </div>

            {/* 추가/수정 폼 */}
            <div class="border rounded p-4">
              <h3 class="font-medium mb-2">
                {editingValueId() ? "Edit Value" : "Add New Value"}
              </h3>
              <form onSubmit={handleValueSubmit}>
                <div class="mb-3">
                  <label class="block text-sm font-medium mb-1" for="value">
                    Value
                  </label>
                  <Field
                    id="value"
                    name="value"
                    type="text"
                    value={valueForm.value}
                    onInput={(e) =>
                      setValueForm("value", e.currentTarget.value)
                    }
                    error={errors().value}
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    This is the actual value stored in the database
                  </p>
                </div>

                <div class="mb-3">
                  <label class="block text-sm font-medium mb-1" for="label">
                    Label
                  </label>
                  <Field
                    id="label"
                    name="label"
                    type="text"
                    value={valueForm.label}
                    onInput={(e) =>
                      setValueForm("label", e.currentTarget.value)
                    }
                    error={errors().label}
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    This is what users will see in the UI
                  </p>
                </div>

                <div class="mb-3">
                  <label
                    class="block text-sm font-medium mb-1"
                    for="description"
                  >
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    type="text"
                    value={valueForm.description}
                    onInput={(e) =>
                      setValueForm("description", e.currentTarget.value)
                    }
                    error={errors().description}
                  />
                </div>

                <div class="mb-3">
                  <label class="block text-sm font-medium mb-1" for="color">
                    Color
                  </label>
                  <Field
                    id="color"
                    name="color"
                    type="color"
                    value={valueForm.color}
                    onInput={(e) =>
                      setValueForm("color", e.currentTarget.value)
                    }
                    error={errors().color}
                  />
                </div>

                <div class="mb-3">
                  <label class="block text-sm font-medium mb-1" for="sortOrder">
                    Sort Order
                  </label>
                  <Field
                    id="sortOrder"
                    name="sortOrder"
                    type="number"
                    value={String(valueForm.sortOrder)}
                    onInput={(e) =>
                      setValueForm("sortOrder", Number(e.currentTarget.value))
                    }
                    error={errors().sortOrder}
                  />
                </div>

                <div class="mb-3">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      class="mr-2"
                      checked={valueForm.isActive}
                      onChange={(e) =>
                        setValueForm("isActive", e.currentTarget.checked)
                      }
                    />
                    <span class="text-sm font-medium">Active</span>
                  </label>
                </div>

                <div class="flex space-x-2">
                  <button
                    type="submit"
                    disabled={
                      addValueMutation.isPending ||
                      updateValueMutation.isPending
                    }
                    class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    {editingValueId()
                      ? updateValueMutation.isPending
                        ? "Updating..."
                        : "Update Value"
                      : addValueMutation.isPending
                      ? "Adding..."
                      : "Add Value"}
                  </button>
                  <Show when={editingValueId()}>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      class="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </Show>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default EnumManager;
