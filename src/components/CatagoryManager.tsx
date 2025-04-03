import { Component, createEffect, createSignal, Index, Show } from "solid-js";
import { useGetAllEnumCategories } from "~/api/query/DynamicEnumQuery";
import { useCreateEnumCategory } from "~/api/mutation/DynamicEnumMutation";
import { createStore } from "solid-js/store";
import * as yup from "yup";

type EnumCategoryForm = {
  name: string;
  description: string;
};

const enumCategorySchema = yup.object().shape({
  name: yup.string().required("카테고리 이름을 입력하세요"),
  description: yup.string().required("카테고리 설명을 입력하세요"),
});

const EnumManager: Component = () => {
  // 선택된 카테고리 ID
  const [selectedCategoryId, setSelectedCategoryId] = createSignal<string>("");

  // 카테고리 생성 폼
  const [categoryForm, setCategoryForm] = createStore<EnumCategoryForm>({
    name: "",
    description: "",
  });

  // 기존 카테고리 목록 조회
  const enumCategoriesQuery = useGetAllEnumCategories();

  // 선택된 카테고리 정보
  const currentCategory = () =>
    enumCategoriesQuery.data?.find((cat) => cat._id === selectedCategoryId());

  // 카테고리 생성 뮤테이션
  const createCategoryMutation = useCreateEnumCategory({
    input: categoryForm,
    onSuccess: async () => {
      setCategoryForm({ name: "", description: "" });
    },
  });

  // 첫 번째 카테고리를 기본 선택
  createEffect(() => {
    if (
      !selectedCategoryId() &&
      enumCategoriesQuery.data &&
      enumCategoriesQuery.data?.length > 0
    ) {
      setSelectedCategoryId(enumCategoriesQuery.data[0]._id);
    }
  });

  // 선택된 카테고리를 초기화
  createEffect(() => {
    if (selectedCategoryId()) {
      const selectedCategory = currentCategory();
      if (selectedCategory) {
        setCategoryForm({
          name: selectedCategory.name,
          description: selectedCategory.description,
        });
      }
    }
  });

  return (
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">카테고리 관리</h1>

      {/* 기존 카테고리 선택 Dropdown */}
      <div class="mb-4">
        <label class="block text-sm font-medium mb-1">기존 카테고리 선택</label>
        <select
          class="border rounded p-2 w-full"
          onChange={(e) => setSelectedCategoryId(e.currentTarget.value)}
          value={selectedCategoryId()}
        >
          <Index each={enumCategoriesQuery.data}>
            {(category) => (
              <option value={category()._id}>{category().name}</option>
            )}
          </Index>
        </select>
      </div>

      {/* 카테고리 생성 폼 */}
      <div class="border rounded p-4">
        <h2 class="font-semibold mb-2">카테고리 생성</h2>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await enumCategorySchema.validate(categoryForm, {
                abortEarly: false,
              });
              await createCategoryMutation.mutateAsync({
                input: { ...categoryForm },
              });
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1" for="name">
              카테고리 이름
            </label>
            <input
              id="name"
              type="text"
              value={categoryForm.name}
              onInput={(e) => setCategoryForm("name", e.currentTarget.value)}
              class="border rounded p-2 w-full"
            />
          </div>

          <div class="mb-3">
            <label class="block text-sm font-medium mb-1" for="description">
              설명
            </label>
            <input
              id="description"
              type="text"
              value={categoryForm.description}
              onInput={(e) =>
                setCategoryForm("description", e.currentTarget.value)
              }
              class="border rounded p-2 w-full"
            />
          </div>

          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            카테고리 추가
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnumManager;
