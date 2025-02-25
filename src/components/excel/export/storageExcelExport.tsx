import * as XLSX from "xlsx";
import { Grouped } from "~/components/storage/WarehouseDisplay";

// 모델 타입 정의
export type Item = {
  _id: string;
  quantity: number;
  storage: string;
  location: string;
  recodedDate: string;
  productCode: string;
  nickname: string;
  description: string;
  unit: string;
  sizeDES: string;
};

// location 파싱 (WarehouseDisplay에 있는 parseLocation과 동일하게 맞춰주세요)
function parseLocation(location: string) {
  const parts = location.split("-");
  if (parts.length === 1) {
    return {
      storageAtCard: "",
      area: "",
      position: parseInt(parts[0]),
      tier: 1,
    };
  } else if (parts.length === 2) {
    return {
      storageAtCard: parts[0],
      area: "",
      position: parseInt(parts[1]),
      tier: 1,
    };
  } else if (parts.length === 3) {
    return {
      storageAtCard: parts[0],
      area: parts[1],
      position: parseInt(parts[2]),
      tier: 1,
    };
  } else if (parts.length === 4) {
    return {
      storageAtCard: parts[0],
      area: parts[1],
      position: parseInt(parts[2]),
      tier: parseInt(parts[3]),
    };
  }
  return { storageAtCard: "", area: "", position: 0, tier: 1 };
}

interface Props {
  data: Grouped; // { [storageKey]: { [areaKey]: Item[] } }
  fileName: string; // 실제 저장할 엑셀 파일명
}

function StorageExcelExport(props: Props) {
  const handleDownload = () => {
    const wb = XLSX.utils.book_new();

    // 탭(스토리지)별로 각각 시트 생성
    Object.entries(props.data).forEach(([storageKey, areaObj]) => {
      // 시트에 들어갈 2차원 배열
      const wsData: any[][] = [];

      // areaObj: { [areaKey]: Item[] }
      // areaKey가 L, R, ... 등 여러 개라면 순서대로 붙입니다.
      Object.entries(areaObj).forEach(([areaKey, items]) => {
        // area 제목 행 (예: "L", "R" 등) ---------------------------
        wsData.push([`[Area: ${areaKey || "(빈)"}]`]);

        // 이 area 내 모든 슬롯을 찾기 위해 위치 파싱
        const parsedItems = items.map((item) => ({
          ...item,
          parsed: parseLocation(item.location),
        }));

        // 이 area에서 사용된 최대 슬롯 번호
        const maxSlot = 25;

        // 3단, 2단, 1단 순서로 행을 생성 -----------------------------
        const tiers = [3, 2, 1];

        // 헤더 행 예: ["단 ↓ / 슬롯 →", "1", "2", "3", ...] 등으로 만들거나
        // 원치 않으면 생략 가능
        const slotHeaders = ["단 ↓ / 슬롯 →"];
        for (let s = 1; s <= maxSlot; s++) {
          slotHeaders.push(String(s));
        }
        wsData.push(slotHeaders);

        // 각 tier(단)를 행으로 만든다
        tiers.forEach((tier) => {
          // 첫 열(0번)은 "3단", "2단", "1단" 라벨
          const row: any[] = [`${tier}단`];

          // 각 슬롯(position)을 순회하며 해당 아이템을 찾는다
          for (let slot = 1; slot <= maxSlot; slot++) {
            const foundItems = parsedItems.filter(
              (it) => it.parsed.position === slot && it.parsed.tier === tier
            );
            if (foundItems.length > 0) {
              // 같은 슬롯‧단에 여러 아이템이 있을 경우 줄바꿈 처리
              const cellText = foundItems
                .map(
                  (fi) =>
                    `${fi.productCode}\n${fi.nickname}\nQty: ${fi.quantity}`
                )
                .join("\n-----\n");
              row.push(cellText);
            } else {
              row.push(""); // 아이템이 없으면 빈 셀
            }
          }

          wsData.push(row);
        });

        // area마다 구분을 위해 한 줄 비움
        wsData.push([]);
      });

      // 2차원 배열 -> 워크시트
      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // (선택) wrapText 등 스타일을 지정하고 싶다면 각 셀에 s 속성을 부여
      // 예: A2만 wrapText
      // if (ws["A2"]) {
      //   ws["A2"].s = {
      //     alignment: { wrapText: true },
      //     border: {
      //       top: { style: "thin", color: { rgb: "000000" } },
      //       bottom: { style: "thin", color: { rgb: "000000" } },
      //       left: { style: "thin", color: { rgb: "000000" } },
      //       right: { style: "thin", color: { rgb: "000000" } },
      //     },
      //   };
      // }

      // 시트 이름 = StorageKey
      XLSX.utils.book_append_sheet(wb, ws, storageKey);
    });

    // 엑셀 파일 저장
    XLSX.writeFile(wb, props.fileName + ".xlsx");
  };

  return <div onClick={handleDownload}>다운로드</div>;
}

export default StorageExcelExport;
