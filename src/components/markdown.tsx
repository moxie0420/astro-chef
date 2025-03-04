import { trpc } from "@lib/trpc/client";
import Purify from "dompurify";
import DOMPurify from "isomorphic-dompurify";
import { marked, type RendererObject } from "marked";
import {
  createSignal,
  Match,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { isServer } from "solid-js/web";

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
  recipeId: string;
}> = (props) => {
  const body = () => props.body;
  const editing = () => props.editing;
  const recipeId = () => props.recipeId;

  const [preview, setPreview] = createSignal(genMd(body()));

  const genPreview: JSX.EventHandler<HTMLTextAreaElement, InputEvent> = ({
    currentTarget: { value },
  }) => setPreview(genMd(value));

  const save: JSX.EventHandler<HTMLTextAreaElement, Event> = ({
    currentTarget: { value },
  }) => {
    trpc.recipe.update.mutate({
      data: {
        body: value,
      },
      id: recipeId(),
    });
  };

  return (
    <div
      data-editing={editing() ? editing() : undefined}
      class="bg-overlay text-text outline-pine border-pine mx-auto min-h-64 max-w-2xl rounded-md data-editing:border-2"
    >
      <Switch>
        <Match when={!editing()}>
          <article
            innerHTML={preview()}
            class="prose-sm prose md:prose-lg 2xl:prose-2xl prose-rosePine border-none p-2 text-center text-pretty"
          />
        </Match>
        <Match when={editing()}>
          <div class="flex size-full min-h-64">
            <textarea
              class="text-text bg-overlay w-full rounded-l-md border-none p-0.5 text-sm"
              innerText={body()}
              onInput={genPreview}
              onChange={save}
            />
            <div
              class="prose prose-rosePine bg-overlay w-full rounded-r-md border-none"
              innerHTML={preview()}
            />
          </div>
        </Match>
      </Switch>
    </div>
  );
};

export default Markdown;
