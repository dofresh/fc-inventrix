import { onMount, onCleanup, JSX } from "solid-js";
import { CloseIcon } from "../svg/close_icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
}

const Modal = (props: ModalProps) => {
  let modalRef: HTMLDivElement | undefined;

  onMount(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef && !modalRef.contains(event.target as Node)) {
        props.onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    onCleanup(() =>
      document.removeEventListener("mousedown", handleClickOutside)
    );
  });

  if (!props.isOpen) return null;

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center"
      onClick={props.onClose}
    >
      <div
        ref={modalRef}
        class="bg-white rounded shadow-lg p-6 relative w-full lg:max-w-[700px] mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button class="absolute top-0 right-0 p-3" onClick={props.onClose}>
          <CloseIcon size={22} fill="#ddd" />
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
