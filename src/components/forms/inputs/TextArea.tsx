import type { ParentComponent } from "solid-js";

interface props {
  name?: string;
  placeholder?: string;
  value?: string;
  onInput?: (
    event: InputEvent & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => void;
  onChange?: (
    event: Event & {
      currentTarget: HTMLTextAreaElement;
      target: HTMLTextAreaElement;
    },
  ) => void;
}

const TextArea: ParentComponent<props> = (props) => {
  return (
    <div class="text-text flex flex-col">
      <div class="inline-block px-1">{props.children}</div>
      <textarea
        name={props.name}
        placeholder={props.placeholder || ""}
        class="bg-highlightLow rounded-md px-2 py-1"
        onInput={(event) => props.onInput?.(event)}
        onChange={(event) => props.onChange?.(event)}
        innerText={props.value || ""}
      ></textarea>
    </div>
  );
};

export default TextArea;
