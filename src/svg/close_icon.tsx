import { IconProps } from "./iconType";
import { Component } from "solid-js";

export const CloseIcon: Component<IconProps> = ({ width, fill = "#fff" }) => (
  <svg
    width={width}
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="17.2783"
      y1="2.39029"
      x2="2.42908"
      y2="17.2395"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="1.72183"
      y1="2.39038"
      x2="16.5711"
      y2="17.2396"
      stroke={fill}
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);
