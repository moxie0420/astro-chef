import { trpc } from "@lib/trpc/client";
import { createResource, For, type Component } from "solid-js";
import { units, type unit } from "src/entity/Ingredient/units";

import Cancel from "src/icons/cancel.svg?component-solid";

const Ingredient: Component<{
  id: number;
}> = (props) => {
  const id = () => props.id;

  const [ingredient, { mutate }] = createResource(
    id,
    async (id) => await trpc.ingredient.read.query(id),
  );

  const removeIngredient = async () =>
    await trpc.ingredient.delete.mutate(id());

  return (
    <>
      <td class="basis-1/3">
        <input
          type="text"
          name="amount"
          class="bg-surface size-full rounded-l-md px-1"
          value={ingredient()?.whole}
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
        <button onClick={[removeIngredient, id()]} class="m-1">
          <Cancel width={20} class="text-love" />
        </button>
      </td>
    </>
  );
};

export default Ingredient;
