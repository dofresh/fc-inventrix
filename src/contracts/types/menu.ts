import { IconType } from "react-icons";

export type MenuType = {
  isSeperate?: boolean;
  name?: string;
  url?: string;
  Icon?: IconType;
  iconRevers?: boolean;
};

export interface IMenu {
  menu: MenuType[];
}
