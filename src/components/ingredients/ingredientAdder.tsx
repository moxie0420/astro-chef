import Fraction from "fraction.js";

import type { fullIngredient, ingredient } from "@lib/ingredients";
import { Units, type unit } from "@lib/types";
import { For, type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { actions } from "astro:actions";
import Add from "src/icons/add.svg?component-solid";

const IngredientAdder: Component<{
  recipeId: number;
  refetch: (
    info?: unknown,
  ) =>
    | fullIngredient[]
    | Promise<fullIngredient[] | undefined>
    | null
    | undefined;
}> = (props) => {
  const recipeId = () => props.recipeId;

  const [newIngredient, setNewIngredient] = createStore({
    name: "",
    amount: "",
    unit: "none" as unit,
  });

  const addIngredient = async ({ amount, name, unit }: ingredient) => {
    const val = new Fraction(amount);

    const newIngredient = {
      name: name,
      unit: unit,
      fraction: val.toFraction(true),
      whole: val.valueOf(),
      recipeId: recipeId(),
    };

    await actions.ingredient.addIngredient(newIngredient);
    props.refetch?.();
  };

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, Event> = async () => {
    addIngredient(newIngredient);
  };

  const updateIngredient: JSX.EventHandler<
    HTMLInputElement | HTMLSelectElement | HTMLButtonElement,
    Event
  > = (event) => {
    const key = event.currentTarget?.name as "name" | "amount" | "unit";
    const val = event.currentTarget?.value;

    if (!(key || val) || val !== "") {
      setNewIngredient(key, val);
    }
  };

  return (
    <div class="flex h-full px-1 py-1 pb-1">
      <div class="basis-1/3">
        <input
          type="text"
          name="amount"
          class="bg-surface w-full rounded-l-md"
          placeholder="Amount"
          onInput={updateIngredient}
        />
      </div>

      <div class="basis-1/3">
        <select
          name="unit"
          id="unit"
          class="bg-surface w-full"
          onInput={updateIngredient}
        >
          <For each={Units}>
            {(unit) => (
              <option value={unit}>
                {unit === "none" ? "---None---" : unit}
              </option>
            )}
          </For>
        </select>
      </div>

      {/* name */}
      <div class="basis-1/3">
        <input
          name="name"
          type="text"
          class="bg-surface text-text w-full rounded-r-md"
          placeholder="Name"
          maxlength="25"
          onInput={updateIngredient}
        />
      </div>

      <button onClick={handleSubmit}>
        <Add width={20} class="text-pine bg-highlightMed m-1 rounded-full" />
      </button>
    </div>
  );
};

export default IngredientAdder;
