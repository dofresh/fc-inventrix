import { AiOutlineAppstore, AiOutlineOrderedList } from "solid-icons/ai";
import { BsBookshelf, BsCreditCard2Front } from "solid-icons/bs";
import { ImNewspaper } from "solid-icons/im";
import { RiDeviceDashboard2Line } from "solid-icons/ri";
import { TbBuildingWarehouse } from "solid-icons/tb";
import { MenuType } from "~/contracts/types/menu";

export const warehouseMenu: MenuType[] = [
  {
    name: "대시보드",
    url: "/warehouse",
    Icon: RiDeviceDashboard2Line,
  },
  { isSeperate: true },
  {
    name: "랙",
    url: "/warehouse/1-L-1",
    Icon: BsBookshelf,
  },
  {
    name: "품목위치현황",
    url: "/warehouse/productlocation",
    Icon: AiOutlineAppstore,
  },
  {
    name: "저장소",
    url: "/warehouse/storage",
    Icon: TbBuildingWarehouse,
  },
  { isSeperate: true },
  {
    name: "파렛트라벨 출력",
    url: "/warehouse/printPalletLabel",
    Icon: ImNewspaper,
  },
  {
    name: "샘플등록",
    url: "/warehouse/sampleRegist",
    Icon: BsCreditCard2Front,
  },
  { isSeperate: true },
  {
    name: "발주고 피킹좌표값",
    url: "/warehouse/baljugoLocation",
    Icon: AiOutlineOrderedList,
  },
];
