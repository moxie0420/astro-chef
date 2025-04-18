import { For, type Component } from "solid-js";
import Cancel from "client/icons/cancel.svg";
import { unit, units } from "@astrochef/units";
import { IngredientType } from "@lib/validations";

const Ingredient: Component<{
  ingredient: IngredientType;
}> = (props) => {
  const ingredient = () => props.ingredient;

  return (
    <>
      <td class="basis-1/3">
        <input
          type="text"
          name="amount"
          class="bg-surface size-full rounded-l-md px-1"
          value={ingredient().amount.fraction}
        />
      </td>
      <td class="basis-1/3">
        <select class="bg-surface size-full px-1" name="Unit">
          <For each={units}>
            {(unit: unit) => (
              <option value={unit} selected={ingredient()?.unit === unit}>
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
        />
      </td>
      <td>
        <button onClick={removeIngredient} class="m-1">
          <Cancel width={20} class="text-love" />
        </button>
      </td>
    </>
  );
};

export default Ingredient;
