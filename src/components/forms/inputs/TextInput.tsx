import { splitProps, type JSX } from "solid-js";

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
    <div class="text-text flex flex-col">
      {props.label && (
        <label for={props.name}>
          {props.label}{" "}
          {props.required && <span class="text-xs italic">*</span>}
        </label>
      )}
      <input
        {...inputProps}
        id={props.name}
        value={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="bg-highlightLow rounded-md px-2 py-1"
      />
      {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
    </div>
  );
};

export default TextInput;
