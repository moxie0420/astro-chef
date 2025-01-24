import {
  createEffect,
  createSignal,
  type Component,
  For,
  type JSX,
} from "solid-js";
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

  createEffect(() => {
    actions.ingredient.updateIngredient({
      ingredientId: ingredient().id,
      amount: amount(),
      name: name(),
      unit: Unit(),
    });
  });

  const updateAmount: JSX.EventHandler<HTMLInputElement, Event> = (event) =>
    setAmount(event.currentTarget.value);

  const updateUnit: JSX.EventHandler<HTMLSelectElement, Event> = (event) =>
    setUnit(event.currentTarget.value);

  const updateName: JSX.EventHandler<HTMLInputElement, Event> = (event) =>
    setName(event.currentTarget.value);

  return (
    <>
      <td class="basis-1/3">
        <input
          type="text"
          class="w-full bg-surface"
          value={amount()}
          onChange={updateAmount}
        />
      </td>
      <td class="basis-1/3">
        <select class="w-full bg-surface" onChange={updateUnit}>
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
        <input
          type="text"
          class="w-full bg-surface"
          value={name()}
          onChange={updateName}
        />
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
