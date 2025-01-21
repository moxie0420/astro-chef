import Fraction from "fraction.js";

import { createSignal, type Component, type JSX, type Setter } from "solid-js";
import { type unit, Units } from "@lib/types";

import Add from "src/icons/add.svg?inline";
import Cancel from "src/icons/cancel.svg?inline";
import { actions } from "astro:actions";

const IngredientAdder = (props: any) => {
  const recipeId = () => props.recipeId;
  const editing = () => props.editing;

  const [name, setName] = createSignal("");
  const [amount, setAmount] = createSignal("");
  const [unit, setUnit] = createSignal<unit>("");

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
    event
  ) => setAmount(event.currentTarget.value);

  const updateUnit: JSX.EventHandler<HTMLSelectElement, Event> = (event) =>
    setUnit(event.currentTarget.value as unit);

  return (
    <tfoot class="flex flex-col items-center justify-between">
      <tr class="flex h-full">
        {/* amount */}
        <td>
          <input
            type="text"
            class="bg-surface w-full"
            placeholder="Amount"
            oninput={updateAmount}
          />
        </td>

        {/* unit */}
        <td>
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
        <td>
          <input
            type="text"
            class="bg-surface text-text w-full"
            placeholder="Name"
            maxlength="25"
            oninput={updateName}
          />
        </td>

        <td>
          <div class="flex flex-col gap-1 h-full m-1 my-auto">
            {/* add button */}
            <button id="addbtn" style="submit">
              <img src={Add} width={20} />
            </button>
            {/* clear button */}
            <button id="clrbtn" style="cancel">
              <img src={Cancel} width={20} />
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default IngredientAdder;
