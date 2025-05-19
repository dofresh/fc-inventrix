import { JSX } from "solid-js";
import { BsThermometerSun } from "solid-icons/bs";
import { IoSnowOutline, IoWaterOutline } from "solid-icons/io";

export const StorageTypeIconMapping: { [key: string]: JSX.Element } = {
  냉장: <IoWaterOutline />,
  냉동: <IoSnowOutline />,
  상온: <BsThermometerSun />,
};
