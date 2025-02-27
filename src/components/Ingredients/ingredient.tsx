import { trpc } from "@lib/trpc/client";
import { createEffect, For, type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import type { Ingredient as Ingredient_t } from "src/entity/Ingredient";
import { units, type unit } from "src/entity/Ingredient/units";

import Cancel from "src/icons/cancel.svg?component-solid";

const Ingredient: Component<{
  ingredient: Ingredient_t;
}> = (props) => {
  const id = () => props.ingredient.id;

  const removeIngredient = async () =>
    await trpc.ingredient.delete.mutate(id());

  const [ingredient, setIngredient] = createStore({
    amount: props.ingredient.fraction,
    unit: props.ingredient.unit,
    name: props.ingredient.name,
  });

  createEffect(() => {
    trpc.ingredient.update.mutate({
      id: id(),
      data: {
        amount: ingredient.amount,
        name: ingredient.name,
        unit: ingredient.unit,
      },
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
          class="bg-surface size-full rounded-l-md px-1"
          value={ingredient.amount}
          onChange={updateIngredient}
        />
      </td>
      <td class="basis-1/3">
        <select
          class="bg-surface size-full px-1"
          name="Unit"
          onChange={updateIngredient}
        >
          <For each={units}>
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
          class="bg-surface size-full rounded-r-md px-1"
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
