// src/components/field/ErrorMessage.tsx
import { Component } from "solid-js";

interface ErrorMessageProps {
  errorMessage?: string;
}

export const ErrorMessage: Component<ErrorMessageProps> = (props) => {
  return (
    <p
      class={`${
        props.errorMessage ? "" : "opacity-0"
      } text-red-500 ml-3 text-xs italic opacity-80`}
    >
      {props.errorMessage}
    </p>
  );
};
