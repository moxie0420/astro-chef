import RecipeCard from "@components/RecipeCard";
import Recipes, { RecipeType } from "@lib/recipes";
import { createInfiniteScroll } from "@solid-primitives/pagination";
import { createFileRoute } from "@tanstack/solid-router";
import { For, Show } from "solid-js";

export const Route = createFileRoute("/recipes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [pages, setEl, { end }] = createInfiniteScroll(
    (page) =>
      new Promise<RecipeType[]>((resolve) => {
        const recipeCursor = Recipes.find(
          {},
          {
            sort: { id: 1 },
            limit: 30,
            skip: 30 * page,
          },
        );
        resolve(recipeCursor.fetch());
      }),
  );

  return (
    <>
      <div class="grid grid-cols-3 gap-1">
        <For each={pages()}>{(item) => <RecipeCard id={item.id} />}</For>
      </div>

      <Show when={!end()}>
        <h1 ref={setEl}>Loading...</h1>
      </Show>
    </>
  );
}
