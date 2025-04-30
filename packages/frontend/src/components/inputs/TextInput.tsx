import { Show, splitProps, type JSX } from "solid-js";

type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLInputElement) => void;
  onInput: JSX.EventHandler<HTMLInputElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLInputElement, Event>;
  onBlur: JSX.EventHandler<HTMLInputElement, FocusEvent>;
};

const TextInput = (props: TextInputProps) => {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);

  return (
    <label for={props.name} class="floating-label w-full">
      <Show when={props.label}>
        <span>
          {props.label}{" "}
          {props.required && <span class="text-xs italic">*</span>}
        </span>
      </Show>

      <input
        {...inputProps}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="input input-accent w-full"
      />
      {props.error && (
        <div id={`${props.name}-error`} class="text-lg">
          {props.error}
        </div>
      )}
    </label>
  );
};

export default TextInput;
