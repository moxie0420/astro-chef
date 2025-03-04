import { fisherYates } from "@lib/shuffle";
import { trpc } from "@lib/trpc/client";
import { recipeShape } from "@lib/validations";
import { atom, computed } from "nanostores";

const compareStr = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

const initial = await trpc.recipe.getMultiple.query();
export const $recipes = atom(initial);

export const $currentRecipe = atom<string>("");

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

export const updateLiked = async (value: boolean, id: string) => {
  trpc.recipe.setLiked.mutate({ id, value });
  const res = await trpc.recipe.getMultiple.query();
  $recipes.set(res);
};

export const createNewRecipe = async (newRecipe: recipeShape) => {
  await trpc.recipe.create.mutate(newRecipe);
  const final = await trpc.recipe.getMultiple.query();
  $recipes.set(final);
};
