import type { fullIngredient } from "@lib/ingredients";
import { Units, type unit } from "@lib/types";
import { actions } from "astro:actions";
import { createEffect, For, type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";

import Cancel from "src/icons/cancel.svg?component-solid";

const Ingredient: Component<{
  ingredient: fullIngredient;
  refetch: (
    info?: unknown,
  ) =>
    | fullIngredient[]
    | Promise<fullIngredient[] | undefined>
    | null
    | undefined;
}> = (props) => {
  const id = () => props.ingredient.id;

  const removeIngredient = async (id: number) => {
    await actions.ingredient.removeIngredient({ ingredientId: id });
    props.refetch?.();
  };

  const [ingredient, setIngredient] = createStore({
    amount: props.ingredient.fraction,
    unit: props.ingredient.unit,
    name: props.ingredient.name,
  });

  createEffect(() => {
    actions.ingredient.updateIngredient({
      ingredientId: id(),
      amount: ingredient.amount,
      name: ingredient.name,
      unit: ingredient.unit,
    });
  });

  const updateIngredient: JSX.EventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLButtonElement,
    Event
  > = (event) => {
    const key = event.currentTarget?.name as "name" | "amount" | "unit";
    const val = event.currentTarget?.value;

    if (!(key || val) || val !== "") {
      setIngredient(key, val);
    }
  };

  return (
    <>
      <td class="basis-1/3">
        <input
          type="text"
          name="amount"
          class="bg-surface w-full rounded-l-md"
          value={ingredient.amount}
          onChange={updateIngredient}
        />
      </td>
      <td class="basis-1/3">
        <select
          class="bg-surface w-full"
          name="Unit"
          onChange={updateIngredient}
        >
          <For each={Units}>
            {(unit: unit) => (
              <option value={unit} selected={ingredient.unit === unit}>
                {unit}
              </option>
            )}
          </For>
        </select>
      </td>
      <td class="basis-1/3">
        <input
          type="text"
          name="name"
          class="bg-surface w-full rounded-r-md"
          value={ingredient.name}
          onChange={updateIngredient}
        />
      </td>
      <td>
        <button onClick={[removeIngredient, id()]} class="m-1">
          <Cancel width={20} class="text-love" />
        </button>
      </td>
    </>
  );
};

export default Ingredient;
