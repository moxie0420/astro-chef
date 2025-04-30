import { RecipeShape, RecipeType } from "@lib/recipes";
import PouchDB from "pouchdb";
import { createResource } from "solid-js";
import { createStore, SetStoreFunction, Store } from "solid-js/store";

export const db = new PouchDB("recipes");

export function createRecipe(recipe: RecipeType) {
  return db.put(recipe);
}

export function useRecipe(
  id: string,
): [Store<RecipeType>, { setRecipe: SetStoreFunction<RecipeType> }] {
  const [recipeResource, { refetch }] = createResource(() => db.get(id));
  const [recipe, setRecipe] = createStore<RecipeType>(
    RecipeShape.parse(recipeResource()),
  );

  db.changes({
    live: true,
    since: "now",
    doc_ids: [id],
    include_docs: true,
  }).on("change", (info) => {
    if (!info.deleted) {
      refetch();
    }
  });

  return [recipe, { setRecipe }];
}
