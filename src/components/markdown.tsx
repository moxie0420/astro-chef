import { type Component, createSignal, Show, type JSX } from "solid-js";

import { marked, type RendererObject } from "marked";
import DOMPurify from "isomorphic-dompurify";
import Purify from "dompurify";
import { actions } from "astro:actions";

const renderer: RendererObject = {
  image({ href, text }) {
    return `<img src="/api/image?path=${href}" alt="${text}"  class="w-1/3 mx-auto" />`;
  },
};

function genMd(text: string) {
  marked.use({ renderer });
  const md = marked.parse(text) as string;
  const clean = Purify.sanitize(md);
  return clean;
}

const intalPreview = (text: string) => {
  marked.use({ renderer });
  const md = marked.parse(text) as string;
  const clean = DOMPurify.sanitize(md);
  return clean;
};

const Markdown: Component<{
  editing: boolean;
  body: string;
  recipeId: number;
}> = (props) => {
  const body = () => props.body;
  const editing = () => props.editing;
  const recipeId = () => props.recipeId;

  const [preview, setPreview] = createSignal(intalPreview(body()));

  const genPreview: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (
    event
  ) => setPreview(genMd(event.currentTarget.value));

  const save: JSX.EventHandler<HTMLTextAreaElement, Event> = (event) => {
    actions.Recipe.updateRecipe({
      body: event.currentTarget.value,
      id: recipeId(),
    });
  };

  return (
    <Show
      when={editing()}
      fallback={
        <article
          innerHTML={preview()}
          class="p-2 pt-10 mx-auto prose-sm prose text-justify flex flex-col md:prose-lg 2xl:prose-2xl prose-rosePine bg-overlay rounded-md my-2 text-text text-pretty"
        />
      }
    >
      <div class="grid grid-row md:grid-cols-2  gap-1 p-1 border rounded-md bg-overlay selection:outline selection:outline-pine max-w-screen-xl mx-auto overflow-scroll h-screen">
        <textarea
          class="prose resize prose-rosePine border-highlightHigh bg-overlay w-full"
          innerText={body()}
          onInput={genPreview}
          onChange={save}
        />
        <div
          id="preview"
          class="prose border-none resize prose-rosePine border-highlightHigh bg-overlay"
          innerHTML={preview()}
        />
      </div>
    </Show>
  );
};

export default Markdown;
