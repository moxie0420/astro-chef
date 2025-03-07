import { splitProps, type JSX } from "solid-js";

type TextAreaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: (element: HTMLTextAreaElement) => void;
  onInput: JSX.EventHandler<HTMLTextAreaElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLTextAreaElement, Event>;
  onBlur: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>;
};

export default function TextArea(props: TextAreaProps) {
  const [, inputProps] = splitProps(props, ["value", "label", "error"]);
  return (
    <div class="text-text flex flex-col">
      {props.label && (
        <label for={props.name}>
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <textarea
        {...inputProps}
        id={props.name}
        innerText={props.value || ""}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="bg-highlightLow rounded-md px-2 py-1"
      ></textarea>
      {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
    </div>
  );
}
