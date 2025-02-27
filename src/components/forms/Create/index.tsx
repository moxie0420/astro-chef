import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { Motion } from "solid-motionone";
import Cancel from "src/icons/cancel.svg?component-solid";

import { trpc } from "@lib/trpc/client";
import { z } from "astro:schema";

const CreateRecipeForm = z.object({
  description: z.string().nonempty().max(500),
  title: z.string().nonempty().max(128),
  author: z.string().nonempty().max(128),
});

const CreateForm: Component<{ closeForm: (val: boolean) => boolean }> = (
  props,
) => {
  const closeForm = () => props.closeForm?.(false);
  let description: HTMLInputElement | undefined,
    title: HTMLInputElement | undefined,
    author: HTMLInputElement | undefined;

  const submit = () =>
    onMount(async () => {
      if (!description || !title || !author) return;

      const newRecipe = {
        description: description.value,
        title: title.value,
        author: author.value,
      };

      CreateRecipeForm.parse(newRecipe);

      return await trpc.recipe.create.mutate(newRecipe);
    });

  return (
    <Motion
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.33 }}
      class="bg-muted mx-auto flex w-full origin-top flex-col gap-1 rounded-md p-2"
    >
      <div class="flex flex-col">
        <label for="title" class="text-xl font-bold">
          Recipe Title
        </label>
        <input
          ref={title}
          id="title"
          class="bg-highlightMed outline-pine rounded-lg outline"
          placeholder="Moms Potato Salad..."
        />
      </div>

      <div class="flex flex-col">
        <label for="author" class="text-lg font-bold">
          Author
        </label>
        <input
          ref={author}
          id="author"
          class="bg-highlightMed border-pine rounded-lg border"
          placeholder="Mom, the bestest ..."
        />
      </div>
      <div class="flex flex-col">
        <label for="description" class="text-lg font-bold">
          Description
        </label>
        <input
          ref={description}
          id="description"
          class="bg-highlightMed outline-pine rounded-lg outline"
          placeholder="The Family Secrets are ..."
        />
      </div>
      <div class="mt-2 flex w-full">
        <button
          class="bg-pine basis-11/12 rounded-md text-xl font-bold"
          onClick={submit}
        >
          Submit
        </button>
        <button onClick={closeForm}>
          <Cancel />
        </button>
      </div>
    </Motion>
  );
};
export default CreateForm;
