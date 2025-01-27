import { actions } from "astro:actions";
import type { unit } from "./types";

const fetchIngredients = async (id: number) => {
  const { data } = await actions.ingredient.getIngredients({
    recipeId: id,
  });
  return data as fullIngredient[];
};

interface fullIngredient {
  id: number;
  recipeId: number;
  name: string;
  unit: string;
  whole: number;
  fraction: string;
}

interface ingredient {
  amount: string;
  name: string;
  unit: unit;
}

export { fetchIngredients };
export type { fullIngredient, ingredient };
