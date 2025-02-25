import { truncate } from "@lib/math";
import {
  createResource,
  For,
  Match,
  onMount,
  Show,
  Switch,
  type Component,
} from "solid-js";

import { trpc } from "@lib/trpc/client";
import Ingredient from "./ingredient";
import IngredientAdder from "./ingredientAdder";

const Ingredients: Component<{
  editing: boolean;
  recipeId: number;
}> = (props) => {
  const editing = () => props.editing;
  const recipeId = () => props.recipeId;

  const isMetric = /(gram|liter)/;

  const [ingredients, { refetch }] = createResource(
    async () => await trpc.recipe.ingredients.query(recipeId()),
  );

  onMount(() => refetch);

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
                  <Show
                    when={editing()}
                    fallback={
                      <td class="mx-auto px-2">
                        {`${isMetric.test(ingredient.unit) ? truncate(ingredient.whole, 3) : ingredient.fraction} ${ingredient.unit}${ingredient.unit !== "none" ? (ingredient.whole > 1 || isMetric.test(ingredient.unit) ? "s" : "") : ""} ${ingredient.unit !== "none" ? "of" : ""} ${ingredient.name}`}
                      </td>
                    }
                  >
                    <Ingredient ingredient={ingredient} />
                  </Show>
                </tr>
              )}
            </For>
          </tbody>
        </Match>
      </Switch>

      <Show when={editing()}>
        <IngredientAdder recipeId={recipeId()} />
      </Show>
    </table>
  );
};

export default Ingredients;
