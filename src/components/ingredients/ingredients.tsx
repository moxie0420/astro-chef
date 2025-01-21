import { createResource, type Component, Show, For, onMount } from "solid-js";
import { isServer } from "solid-js/web";
import { actions, getActionPath } from "astro:actions";
import { Units, isMetric, type unit } from "@lib/types";
import { truncate } from "@lib/math";

import Cancel from "src/icons/cancel.svg?inline";

import IngredientAdder from "./ingredientAdder";

const fetchIngredients = async (id: number) => {
  if (!isServer) {
    const { data } = await actions.ingredient.getIngredients({
      recipeId: id,
    });
    return data;
  }
};

const Ingredients = (props: any) => {
  const editing = () => props.editing as boolean;
  const recipeId = () => props.recipeId as number;

  const [ingredients, { refetch }] = createResource(recipeId, fetchIngredients);

  const removeIngredient = async (id: number) => {
    await actions.ingredient.removeIngredient({ ingredientId: id });
    refetch();
  };

  return (
    <table class="bg-overlay m-1 p-4 border-highlightHigh text-sm md:text-xl lg:text-2xl 2xl:text-3xl mx-auto text-text rounded-lg">
      <thead class="flex w-full">
        <tr class="justify-around text-left flex w-full mx-1">
          <Show
            when={editing()}
            fallback={<th class="mx-auto underline">Ingredients</th>}
          >
            <th>Amount</th>
            <th>Unit</th>
            <th>Name</th>
          </Show>
        </tr>
      </thead>
      <tbody class="flex flex-col items-center justify-between max-h-screen scroll-auto">
        <For each={ingredients()}>
          {(ingredient) => (
            <tr class="w-full">
              <Show
                when={editing()}
                fallback={
                  <td class="px-2">
                    {`${isMetric.test(ingredient.unit) ? truncate(ingredient.whole, 3) : ingredient.fraction} ${ingredient.unit}${ingredient.unit !== "" ? (ingredient.whole > 1 || isMetric.test(ingredient.unit) ? "s" : "") : ""} ${ingredient.unit !== "" ? "of" : ""} ${ingredient.name}`}
                  </td>
                }
              >
                <>
                  <td>
                    <input
                      id="amount"
                      type="text"
                      class="w-full bg-surface"
                      value={ingredient.whole}
                    />
                  </td>
                  <td>
                    <select id="unit" class="w-full bg-surface">
                      <For each={Units}>
                        {(unit) => (
                          <option
                            value={unit}
                            selected={ingredient.unit === unit}
                          >
                            {unit}
                          </option>
                        )}
                      </For>
                    </select>
                  </td>
                  <td>
                    <input
                      id="name"
                      type="text"
                      class="w-full bg-surface"
                      value={ingredient.name}
                    />
                  </td>
                  <td>
                    <button
                      style="cancel"
                      onClick={[removeIngredient, ingredient.id]}
                      class="m-1"
                    >
                      <img src={Cancel} width={20} />
                    </button>
                  </td>
                </>
              </Show>
            </tr>
          )}
        </For>
      </tbody>
      <Show when={editing()}>
        <IngredientAdder editing={true} recipeId={recipeId()} />
      </Show>
    </table>
  );
};

export default Ingredients;
