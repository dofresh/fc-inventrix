import { Component } from "solid-js";
import { Motion } from "solid-motionone";

interface ArrowExpandButtonProps {
  expand: boolean;
  setExpand: (value: boolean) => void;
}

const ArrowExpandButton: Component<ArrowExpandButtonProps> = (props) => {
  return (
    <div
      onClick={() => {
        if (typeof window !== "undefined") {
          localStorage.setItem("sidebarOpen", String(!props.expand));
        }
        props.setExpand(!props.expand);
      }}
      class="ml-[28px] h-6 space-y-[6px] mt-6 z-50 cursor-pointer md:block hidden"
    >
      <Motion
        animate={{
          rotate: props.expand ? -40 : 40,
          transition: {
            duration: 0.3,
            easing: [0.4, 0, 0.2, 1],
          },
        }}
        class="h-[1.5px] w-[14px] bg-slate-700"
      />
      <Motion
        animate={{
          rotate: props.expand ? 40 : -40,
          transition: {
            duration: 0.3,
            easing: [0.4, 0, 0.2, 1],
          },
        }}
        class="h-[1.5px] w-[14px] bg-slate-700"
      />
    </div>
  );
};

export default ArrowExpandButton;
