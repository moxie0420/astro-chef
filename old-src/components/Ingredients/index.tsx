import { $editing } from "@lib/state";
import { $currentRecipeData } from "@lib/state/recipes";
import { useStore } from "@nanostores/solid";
import { For, Match, Show, Switch } from "solid-js";
import Ingredient from "./ingredient";
import IngredientAdder from "./ingredientAdder";

const truncate = (number: number, places: number) => {
  const multiplier = Math.pow(10, Math.abs(places));
  const adjusted = number * multiplier;
  const truncated = Math[number < 0 ? "ceil" : "floor"](adjusted);
  return truncated / multiplier;
};

const isMetric = /(gram|liter)/;

const Ingredients = () => {
  const editing = useStore($editing);
  const recipe = useStore($currentRecipeData);

  const ingredients = () =>
    recipe()?.ingredients.map((ingredients) => ingredients.id);

  return (
    <table class="bg-overlay border-highlightHigh text-text m-1 mx-auto w-full max-w-2xl rounded-lg p-4 text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
      <thead class="mx-auto flex w-full">
        <tr class="mx-1 flex w-full text-left">
          <Show
            when={editing()}
            fallback={
              <th class="mx-auto pb-2 text-2xl font-bold">Ingredients</th>
            }
          >
            <th class="basis-1/3">Amount</th>
            <th class="basis-1/3">Unit</th>
            <th class="basis-1/3">Name</th>
          </Show>
        </tr>
      </thead>

      <Switch>
        <Match when={!ingredients() && !editing()}>
          <div class="text-center">Nothing Here Yet</div>
        </Match>
        <Match when={ingredients()}>
          <tbody class="mx-auto scroll-auto">
            <For each={ingredients()}>
              {(ingredient) => (
                <tr class="flex w-full flex-row p-1">
                  <Ingredient id={ingredient} />
                </tr>
              )}
            </For>
          </tbody>
        </Match>
      </Switch>

      <Show when={editing()}>
        <IngredientAdder />
      </Show>
    </table>
  );
};

export default Ingredients;
