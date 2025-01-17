import { createSignal } from "solid-js";
import type { Component, JSXElement, ParentComponent } from "solid-js";

interface Props {
  isEnable?: boolean;
  callback?: () => void;
  children: JSXElement;
}

const IconButton: Component<Props> = (props) => {
  const [effect, setEffect] = createSignal(false);

  return (
    <div
      class={`text-[4rem] text-gray-300 ${effect() ? "animate-wiggle" : ""} ${
        props.isEnable ? "text-green-500" : ""
      }`}
      onClick={() => {
        setEffect(true);
      }}
      onAnimationEnd={() => setEffect(false)}
    >
      {props.children}
    </div>
  );
};

export default IconButton;
