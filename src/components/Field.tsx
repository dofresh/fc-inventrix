import { Component, JSX, Show } from "solid-js";
import { ErrorMessage } from "./ErrorMessage";

interface FieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: string;
}

export const Field: Component<FieldProps> = (props) => {
  return (
    <div>
      <input
        {...props}
        class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        classList={{
          "border-red-500": !!props.error,
        }}
      />
      <Show when={props.error}>
        <ErrorMessage errorMessage={props.error} />
      </Show>
    </div>
  );
};
