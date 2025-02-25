import domtoimage from "dom-to-image";
import { useActualStorageItemsQuantity } from "~/api/query/actualInventory";
import WarehouseDisplay from "~/components/storage/WarehouseDisplay";

function MyComponent() {
  let captureRef: HTMLDivElement | undefined;

  const handleCapture = () => {
    if (!captureRef) return;

    const actualWidth = captureRef.scrollWidth;
    const actualHeight = captureRef.scrollHeight;

    domtoimage
      .toPng(captureRef, {
        style: {
          // 배경 흰색
          backgroundColor: "#ffffff",
          // 고해상도(2배)
          transform: "scale(2)",
          transformOrigin: "top left",
          width: actualWidth + "px",
          height: actualHeight + "px",
        },
        width: actualWidth * 2,
        height: actualHeight * 2,
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "high-res.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error("캡처 오류:", err));
  };

  const ActualStorageInventory = useActualStorageItemsQuantity("20240701");
  const items =
    ActualStorageInventory.data?.getStorageItemsQuantity.itemsQuantities || [];

  return (
    <div style="background-color:#ffffff; color:#000000;">
      {/* 상단 버튼 */}
      <div style="padding:1rem; border-bottom:1px solid #ccc;">
        <button onClick={handleCapture}>고해상도 캡처</button>
      </div>

      {/* 캡처 대상 영역 */}
      <div
        ref={captureRef}
        style="
          border:1px solid #ccc;
          padding:10px;
          /* 스크롤을 없애려면 overflow:auto 제거 또는 높이 제한 없이 */
        "
      >
        {/* 흰색 배경 위에 검은색 글자 */}
        <WarehouseDisplay items={items} />
      </div>
    </div>
  );
}

export default MyComponent;
