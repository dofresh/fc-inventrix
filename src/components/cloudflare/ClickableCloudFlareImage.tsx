import { createSignal } from "solid-js";
import {} from "solid-js/web";

import { Maybe } from "graphql/jsutils/Maybe";
import AddPhoto from "~/svg/addPhoto";

interface ClickableCloudFlareImageProps {
  imageId: Maybe<string> | undefined;
  upsertloading?: boolean;
  onFileChange: (e: any) => void;
}

/**
 * 클릭하면 파일 선택창을 열고, 선택한 파일을 onFileChange로 전달하는 컴포넌트
 */
const ClickableCloudFlareImage = (props: ClickableCloudFlareImageProps) => {
  let fileInputRef: HTMLInputElement | undefined;

  // 이미지를 클릭하면 파일 입력 창 열기
  const handleClickImage = () => {
    if (!fileInputRef) return;
    fileInputRef?.click();
  };

  return (
    <div class="absolute top-0 group w-full h-full">
      {/* 숨겨진 파일 입력 */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e: Event) => {
          const target = e.currentTarget as HTMLInputElement;
          const file = target.files?.[0];
          if (!file) return;

          const maxSizeMB = 10;
          const maxPixels = 100_000_000;

          if (file.size > maxSizeMB * 1024 * 1024) {
            alert("10MB 이하의 이미지만 업로드 가능합니다.");
            target.value = "";
            return;
          }

          const img = new Image();
          img.onload = () => {
            if (img.width * img.height > maxPixels) {
              alert("1억 픽셀(100메가픽셀) 이하의 이미지만 업로드 가능합니다.");
              target.value = "";
            } else {
              props.onFileChange(e as unknown as any);
            }
          };
          img.onerror = () => {
            alert("이미지 로드에 실패했습니다.");
            target.value = "";
          };
          img.src = URL.createObjectURL(file);
        }}
      />
      <div
        class="flex sm:hidden group-hover:flex "
        style={{
          position: "absolute",
          inset: 0,
          "align-items": props.imageId ? "end" : "center",
          "justify-content": props.imageId ? "right" : "center",
          background: "rgba(255, 255, 255, 0)",
          "z-index": 10,
        }}
      >
        <div onClick={handleClickImage} class="cursor-pointer">
          <AddPhoto width={70} fill="#444" />
        </div>
      </div>
      {props.upsertloading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            background: "rgba(255, 255, 255, 0.7)",
            "z-index": 10,
          }}
        >
          <span style={{ "font-size": "12px", color: "#999" }}>
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          </span>
        </div>
      )}
    </div>
  );
};
