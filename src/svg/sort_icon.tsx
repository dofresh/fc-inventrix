import { Component } from "solid-js";
import { IconProps } from "./iconType";

export const SortIcon: Component<IconProps> = (props) => (
  <svg width={props.size} viewBox="0 0 255 315">
    <path
      id="다각형_1"
      data-name="다각형 1"
      d="M127.5,0,255,131H0Z"
      fill="currentColor"
    />
    <path
      id="다각형_2"
      data-name="다각형 2"
      d="M127.5,0,255,131H0Z"
      transform="translate(255 315) rotate(180)"
      fill="currentColor"
    />
  </svg>
);
