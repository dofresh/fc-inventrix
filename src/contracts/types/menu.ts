import { IconTypes } from "solid-icons";

export type MenuType = {
  isSeperate?: boolean;
  name?: string;
  url?: string;
  Icon?: IconTypes;
  iconRevers?: boolean;
};

export interface IMenu {
  menu: MenuType[];
}
