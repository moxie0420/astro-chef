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
  const ingredient = () => props.ingredient;

  const removeIngredient = async (id: number) => {
    await actions.ingredient.removeIngredient({ ingredientId: id });
    props.refetch?.();
  };

  const [{ amount, Unit, name }, setIngredient] = createStore({
    amount: ingredient().fraction,
    Unit: ingredient().unit,
    name: ingredient().name,
  });

  createEffect(() => {
    actions.ingredient.updateIngredient({
      ingredientId: ingredient().id,
      amount: amount,
      name: name,
      unit: Unit,
    });
  });

  const updateIngredient: JSX.EventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLButtonElement,
    Event
  > = (event) => {
    const key = event.currentTarget?.name as "name" | "amount" | "Unit";
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
          value={amount}
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
              <option value={unit} selected={Unit === unit}>
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
          value={name}
          onChange={updateIngredient}
        />
      </td>
      <td>
        <button onClick={[removeIngredient, ingredient().id]} class="m-1">
          <Cancel width={20} class="text-love" />
        </button>
      </td>
    </>
  );
};

export default Ingredient;
