import type { ingredients } from "@db/schema/ingredients";
import { actions } from "astro:actions";

const fetchIngredients = async (id: number) => {
  const { data } = await actions.ingredient.getIngredients({
    recipeId: id,
  });
  return data;
};
type unit =
  | "none"
  | "teaspoon"
  | "tablespoon"
  | "cup"
  | "ounce"
  | "fluid cup"
  | "fluid ounce"
  | "pint"
  | "quart"
  | "gallon"
  | "kilogram"
  | "gram"
  | "miligram";

const units: unit[] = [
  "none",
  "teaspoon",
  "tablespoon",
  "cup",
  "ounce",
  "fluid cup",
  "fluid ounce",
  "pint",
  "quart",
  "gallon",
  "kilogram",
  "gram",
  "miligram",
];

type ingredient = typeof ingredients.$inferSelect;

export { fetchIngredients, units };
export type { ingredient, unit };
