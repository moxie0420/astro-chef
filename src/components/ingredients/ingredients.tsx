import { truncate } from "@lib/math";
import { isMetric } from "@lib/types";
import { createResource, For, Show, Suspense, type Component } from "solid-js";

import { fetchIngredients } from "@lib/ingredients";
import Ingredient from "./ingredient";
import IngredientAdder from "./ingredientAdder";

const Ingredients: Component<{ editing: boolean; recipeId: number }> = (
  props: any,
) => {
  const editing = () => props.editing;
  const recipeId = () => props.recipeId;

  const [ingredients, { refetch }] = createResource(() =>
    fetchIngredients(recipeId()),
  );

  return (
    <table class="bg-overlay border-highlightHigh text-text m-1 mx-auto rounded-lg p-4 text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
      <thead class="mx-auto flex w-full">
        <tr class="mx-1 flex w-full text-left">
          <Show
            when={editing()}
            fallback={<th class="mx-auto underline">Ingredients</th>}
          >
            <th class="basis-1/3">Amount</th>
            <th class="basis-1/3">Unit</th>
            <th class="basis-1/3">Name</th>
          </Show>
        </tr>
      </thead>
      <tbody class="max-h-screen scroll-auto">
        <Suspense fallback={<div>Nothing Here Yet</div>}>
          <For each={ingredients()}>
            {(ingredient) => (
              <tr class="flex w-full flex-row p-1">
                <Show
                  when={editing()}
                  fallback={
                    <td class="px-2">
                      {`${isMetric.test(ingredient.unit) ? truncate(ingredient.whole, 3) : ingredient.fraction} ${ingredient.unit}${ingredient.unit !== "" ? (ingredient.whole > 1 || isMetric.test(ingredient.unit) ? "s" : "") : ""} ${ingredient.unit !== "" ? "of" : ""} ${ingredient.name}`}
                    </td>
                  }
                >
                  <Ingredient ingredient={ingredient} refetch={refetch} />
                </Show>
              </tr>
            )}
          </For>
        </Suspense>
      </tbody>
      <Show when={editing()}>
        <IngredientAdder recipeId={recipeId()} refetch={refetch} />
      </Show>
    </table>
  );
};

export default Ingredients;
