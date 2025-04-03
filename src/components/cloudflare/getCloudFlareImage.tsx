// src/components/GetCloudFlareImage.tsx

import { createSignal, Show } from "solid-js";
import AddPhoto from "~/svg/addPhoto";

export enum SizeType {
  THUMB_NAIL = "thumbnail",
  THUMB_128 = "thumb128",
  THUMB_256 = "thumb256",
  THUMB_512 = "thumb512",
  PUBLIC = "public",
  NAVERDTAILIMAGE = "naverDtailImage",
}

export const ImageSizeMapping: { [key in SizeType]: { x: string; y: string } } =
  {
    [SizeType.THUMB_NAIL]: { x: "64px", y: "64px" },
    [SizeType.THUMB_128]: { x: "128px", y: "128px" },
    [SizeType.THUMB_256]: { x: "256px", y: "256px" },
    [SizeType.THUMB_512]: { x: "512px", y: "512px" },
    [SizeType.PUBLIC]: { x: "1366px", y: "768px" },
    [SizeType.NAVERDTAILIMAGE]: { x: "1200px", y: "5000px" },
  };

interface Props {
  imageId?: string;
  sizeType?: SizeType;
  width?: string;
  height?: string;
  fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function GetCloudFlareImage(props: Props) {
  const {
    imageId,
    sizeType = SizeType.PUBLIC,
    width = ImageSizeMapping[sizeType].x,
    height = ImageSizeMapping[sizeType].y,
    fit = "contain",
  } = props;

  const [isLoading, setIsLoading] = createSignal(!!imageId);
  const src = `${
    import.meta.env.VITE_CLOUDFLARE_ACCOUNT_HASH
  }${imageId}/${sizeType}`;

  return (
    <div class="relative" style={{ width, height }}>
      <Show
        when={imageId}
        fallback={
          <div
            style={{
              position: "absolute",
              inset: "0",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              background: "rgba(255, 255, 255, 0.7)",
              "z-index": "10",
            }}
          >
            <AddPhoto width={70} fill="#EEE" />
          </div>
        }
      >
        <img
          src={src}
          alt="product image"
          style={{
            "object-fit": fit,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </Show>
      <Show when={isLoading()}>
        <div
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            background: "rgba(255, 255, 255, 0.7)",
            "z-index": "10",
          }}
        >
          <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        </div>
      </Show>
    </div>
  );
}
