import { type Component, createSignal, Show, type JSX } from "solid-js";
import { isServer } from "solid-js/web";

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
  const clean = isServer ? DOMPurify.sanitize(md) : Purify.sanitize(md);
  return clean;
}

const Markdown: Component<{
  editing: boolean;
  body: string;
  recipeId: number;
}> = (props) => {
  const body = () => props.body;
  const editing = () => props.editing;
  const recipeId = () => props.recipeId;

  const [preview, setPreview] = createSignal(genMd(body()));

  const genPreview: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = (
    event,
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
          class="prose-sm prose md:prose-lg 2xl:prose-2xl prose-rosePine bg-overlay text-text mx-auto my-2 flex flex-col rounded-md p-2 pt-10 text-justify text-pretty"
        />
      }
    >
      <div class="grid-row bg-overlay selection:outline-pine mx-auto grid h-screen max-w-screen-xl gap-1 overflow-scroll rounded-md border p-1 selection:outline md:grid-cols-2">
        <textarea
          class="prose prose-rosePine border-highlightHigh bg-overlay w-full resize"
          innerText={body()}
          onInput={genPreview}
          onChange={save}
        />
        <div
          class="prose prose-rosePine border-highlightHigh bg-overlay resize border-none"
          innerHTML={preview()}
        />
      </div>
    </Show>
  );
};

export default Markdown;
