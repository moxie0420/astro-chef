import TextInput from "@components/forms/inputs/TextInput";
import type { Component } from "solid-js";
import { createSignal } from "solid-js";

const Title: Component<{ title?: string; author?: string }> = (props) => {
  const [currentTitle, setCurrentTitle] = createSignal(
    props.title || "untitled",
  );
  const [currentAuthor, setCurrentAuthor] = createSignal(
    props.author || "No one",
  );

  return (
    <div class="flex flex-col">
      <label for="title" class="basis-1/16 text-3xl font-bold">
        {currentTitle()}
      </label>
      <label for="author" class="basis-1/16 text-xl">
        By {currentAuthor()}
      </label>
      <div class="my-1 flex flex-col gap-1">
        <TextInput
          name="title"
          placeholder="Recipe Title"
          value={currentTitle()}
          onInput={({ currentTarget: { value } }) => setCurrentTitle(value)}
        >
          Title
        </TextInput>

        <TextInput
          name="author"
          value={currentAuthor()}
          onInput={({ currentTarget: { value } }) => setCurrentAuthor(value)}
          placeholder="Recipe Author"
        >
          Author
        </TextInput>
      </div>
    </div>
  );
};

export default Title;
