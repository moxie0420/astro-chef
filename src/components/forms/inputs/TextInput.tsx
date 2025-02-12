import type { ParentComponent } from "solid-js";

interface props {
  name?: string;
  placeholder?: string;
  value?: string;
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
}

const TextInput: ParentComponent<props> = (props) => {
  return (
    <div class="flex flex-col">
      <div class="inline-block px-1">{props.children}</div>
      <input
        name={props.name}
        placeholder={props.placeholder || ""}
        value={props.value || ""}
        class="bg-highlightLow rounded-md px-2 py-1"
        onInput={(event) => props.onInput?.(event)}
        onChange={(event) => props.onChange?.(event)}
      />
    </div>
  );
};

export default TextInput;
