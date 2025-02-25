import { trpc } from "@lib/trpc/client";
import type { unit } from "@lib/units";
import { units } from "@lib/units";
import { For, type Component, type JSX } from "solid-js";
import { createStore } from "solid-js/store";
import Add from "src/icons/add.svg?component-solid";

const IngredientAdder: Component<{
  recipeId: number;
}> = (props) => {
  const recipeId = () => props.recipeId;

  const [newIngredient, setNewIngredient] = createStore<{
    name: string;
    amount: string;
    unit: unit;
  }>({
    name: "",
    amount: "",
    unit: "none",
  });

  const handleSubmit: JSX.EventHandler<HTMLButtonElement, Event> = async () => {
    await trpc.ingredient.create.mutate({
      recipeId: recipeId(),
      data: newIngredient,
    });
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
          class="bg-surface size-full rounded-l-md px-1"
          placeholder="Amount"
          onInput={updateIngredient}
        />
      </div>

      <div class="basis-1/3">
        <select
          name="unit"
          id="unit"
          class="bg-surface size-full px-1"
          onInput={updateIngredient}
        >
          <For each={units}>
            {(unit) => <option value={unit}>{unit}</option>}
          </For>
        </select>
      </div>

      {/* name */}
      <div class="basis-1/3">
        <input
          name="name"
          type="text"
          class="bg-surface text-text size-full rounded-r-md px-1"
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
