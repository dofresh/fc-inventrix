// src/components/DropdownMenu.tsx
import { Component, createSignal, JSX, onMount, Show } from "solid-js";
import { Motion } from "solid-motionone";

interface DropdownMenuProps {
  trigger: JSX.Element;
  children: JSX.Element;
}

export const DropdownMenu: Component<DropdownMenuProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  const handleOutsideClick = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  });

  return (
    <div ref={containerRef} class="relative">
      <div
        class="cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen());
        }}
      >
        {props.trigger}
      </div>
      <Show when={isOpen()}>
        <Motion
          initial={{
            opacity: 0,
            y: -10,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.2,
              easing: [0.4, 0, 0.2, 1], // ease-out
            },
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.95,
            transition: {
              duration: 0.2,
              easing: [0.4, 0, 0.2, 1],
            },
          }}
          class="absolute right-0 mt-2 bg-white text-base z-50 py-2 
         list-none text-left rounded shadow-lg min-w-[12rem] 
         dark:border-neutral-800 dark:bg-zinc-800/30 
         origin-top-right"
        >
          {props.children}
        </Motion>
      </Show>
    </div>
  );
};
