import { For, Show, splitProps, type JSX } from "solid-js";

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

export default function Select(props: SelectProps) {
  const [, selectProps] = splitProps(props, [
    "each",
    "value",
    "label",
    "error",
  ]);

  return (
    <label for={props.name}>
      <Show when={props.label}>
        {props.label} {props.required && <span class="text-xs italic">*</span>}
      </Show>
      <select
        {...selectProps}
        id={props.name}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
        class="select"
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
    </label>
  );
}
