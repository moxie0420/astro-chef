import { createSignal, type Component, For } from "solid-js";
import { actions } from "astro:actions";
import { Units, type unit } from "@lib/types";

import Cancel from "src/icons/cancel.svg?component-solid";

const Ingredient: Component<{
  ingredient: {
    unit: string;
    name: string;
    id: number;
    recipeId: number;
    whole: number;
    fraction: string;
  };
}> = (props) => {
  const ingredient = () => props.ingredient;

  const removeIngredient = async (id: number) => {
    await actions.ingredient.removeIngredient({ ingredientId: id });
  };

  const [amount, setAmount] = createSignal(ingredient().fraction);
  const [Unit, setUnit] = createSignal(ingredient().unit);
  const [name, setName] = createSignal(ingredient().name);

  return (
    <>
      <td class="basis-1/3">
        <input type="text" class="w-full bg-surface" value={amount()} />
      </td>
      <td class="basis-1/3">
        <select id="unit" class="w-full bg-surface">
          <For each={Units}>
            {(unit: unit) => (
              <option value={unit} selected={Unit() === unit}>
                {unit}
              </option>
            )}
          </For>
        </select>
      </td>
      <td class="basis-1/3">
        <input id="name" type="text" class="w-full bg-surface" value={name()} />
      </td>
      <td>
        <button
          style="cancel"
          onClick={[removeIngredient, ingredient().id]}
          class="m-1"
        >
          <Cancel width={20} class="text-love" />
        </button>
      </td>
    </>
  );
};

export default Ingredient;
