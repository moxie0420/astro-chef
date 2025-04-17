import { createResource, For, Match, Show, Switch } from 'solid-js';
import Ingredient from './ingredient';
import IngredientAdder from './ingredientAdder';
import { Editing } from '@lib/state';
import { useStore } from '@tanstack/solid-store';
import Recipes from '@lib/recipes';

const Ingredients = (props: { id: string }) => {
  const id = () => props.id;
  const editing = useStore(Editing);

  const ingredients = Recipes.findOne({ id: id() })?.ingredients;

  return (
    <table class="bg-overlay border-highlightHigh text-text m-1 mx-auto w-full max-w-2xl rounded-lg p-4 text-sm md:text-xl lg:text-2xl 2xl:text-3xl">
      <thead class="mx-auto flex w-full">
        <tr class="mx-1 flex w-full text-left">
          <Switch>
            <Match when={editing}>
              <th class="basis-1/3">Amount</th>
              <th class="basis-1/3">Unit</th>
              <th class="basis-1/3">Name</th>
            </Match>
            <Match when={!editing}>
              <th class="mx-auto pb-2 text-2xl font-bold">Ingredients</th>
            </Match>
          </Switch>
        </tr>
      </thead>

      <tbody class="mx-auto scroll-auto">
        <Show when={ingredients}>
          <For each={ingredients}>
            {(ingredient) => (
              <tr class="flex w-full flex-row p-1">
                <Ingredient ingredient={ingredient} />
              </tr>
            )}
          </For>
        </Show>
      </tbody>

      <Show when={editing}>
        <IngredientAdder />
      </Show>
    </table>
  );
};

export default Ingredients;
