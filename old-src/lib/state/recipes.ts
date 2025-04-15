import { fisherYates } from "@lib/shuffle";
import { trpc } from "@lib/trpc/client";
import { type partialRecipeShapeType } from "@lib/validations";
import { atom, computed, task } from "nanostores";
import { $currentUrl } from ".";

const compareStr = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

const initial = await trpc.recipe.getMultiple.query();
export const $recipes = atom(initial);

export const $currentRecipe = computed($currentUrl, (old) => {
  const url = $currentUrl.get();
  if (url.startsWith("/recipes/")) return url.substring(9);
  if (url.startsWith("/edit/")) return url.substring(6);
  return old;
});
export const $currentRecipeData = computed([$recipes, $currentRecipe], () =>
  task(async () =>
    $recipes.get().find((recipe) => recipe.id === $currentRecipe.get()),
  ),
);

// computed recipe arrays

export const $randomRecipes = computed($recipes, (recipes) =>
  fisherYates(recipes),
);

export const $recipesById = computed($recipes, (recipes) => {
  return recipes.sort(({ id: a }, { id: b }) => compareStr(a, b));
});

export const $recipesByIdDesc = computed($recipes, (recipes) =>
  recipes.sort(({ id: a }, { id: b }) => compareStr(b, a)),
);

export const $likedRecipes = computed($recipes, (recipes) =>
  recipes.filter((recipe) => recipe.liked),
);

export const $popularRecipes = computed($recipes, (recipes) =>
  recipes.sort((a, b) => (a.views || 0) - (b.views || 0)),
);

// helper functions

export const updateLiked = async (id: string) => {
  const old = $recipes.get().find((recipe) => (recipe.id = id));
  if (old)
    old.liked
      ? await trpc.recipe.setLiked.mutate({ value: false, id })
      : await trpc.recipe.setLiked.mutate({ value: true, id });

  const res = await trpc.recipe.getMultiple.query();
  $recipes.set(res);
};

export const createNewRecipe = async (newRecipe: partialRecipeShapeType) => {
  await trpc.recipe.create.mutate(newRecipe);
  const final = await trpc.recipe.getMultiple.query();
  $recipes.set(final);
};
