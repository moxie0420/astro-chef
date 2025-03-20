import { For, splitProps, type JSX } from "solid-js";

type option = [label: string, value: string];

type SelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  each: option[];
  error: string;
  required?: boolean;
  ref: (element: HTMLSelectElement) => void;
  onInput: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
};

export const Select = (props: SelectProps) => {
  const [, selectProps] = splitProps(props, [
    "each",
    "value",
    "label",
    "error",
  ]);

  return (
    <div class="text-text flex flex-col">
      {props.label && (
        <label for={props.name}>
          {props.label}{" "}
          {props.required && <span class="text-xs italic">*</span>}
        </label>
      )}
      <select
        {...selectProps}
        id={props.name}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="bg-highlightLow rounded-md px-2 py-1"
      >
        <For each={props.each}>
          {([label, value]) => (
            <option value={value} selected={props.value === value}>
              {label}
            </option>
          )}
        </For>
      </select>
      {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
    </div>
  );
};
