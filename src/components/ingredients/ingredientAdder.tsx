import Fraction from "fraction.js";

import { Units, type unit } from "@lib/types";
import { createSignal, type Component, type JSX } from "solid-js";

import { actions } from "astro:actions";
import Add from "src/icons/add.svg?component-solid";

const IngredientAdder: Component<{
  recipeId: number;
}> = (props: any) => {
  const recipeId = () => props.recipeId;

  const [name, setName] = createSignal("");
  const [amount, setAmount] = createSignal("");
  const [unit, setUnit] = createSignal<unit>("none");

  const addIngredient = async () => {
    const val = new Fraction(amount());
    await actions.ingredient.addIngredient({
      name: name(),
      unit: unit(),
      fraction: val.toFraction(true),
      whole: val.valueOf(),
      recipeId: recipeId(),
    });
  };

  const updateName: JSX.EventHandler<HTMLInputElement, Event> = (event) =>
    setName(event.currentTarget.value);

  const updateAmount: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    event,
  ) => setAmount(event.currentTarget.value);

  const updateUnit: JSX.EventHandler<HTMLSelectElement, Event> = (event) =>
    setUnit(event.currentTarget.value as unit);

  return (
    <tfoot>
      <tr class="flex h-full">
        {/* amount */}
        <td class="basis-1/3">
          <input
            type="text"
            class="bg-surface w-full"
            placeholder="Amount"
            oninput={updateAmount}
          />
        </td>

        {/* unit */}
        <td class="basis-1/3">
          <select
            name="unit"
            id="unit"
            class="bg-surface w-full"
            onchange={updateUnit}
          >
            <option selected value="">
              {" ----None---- "}
            </option>
            {Units.map((unit) => (
              <option value={unit}>{unit}</option>
            ))}
          </select>
        </td>

        {/* name */}
        <td class="basis-1/3">
          <input
            type="text"
            class="bg-surface text-text w-full"
            placeholder="Name"
            maxlength="25"
            oninput={updateName}
          />
        </td>

        <td>
          <button style="submit">
            <Add
              width={20}
              class="text-pine bg-highlightMed m-1 rounded-full"
              onClick={addIngredient}
            />
          </button>
        </td>
      </tr>
    </tfoot>
  );
};

export default IngredientAdder;
