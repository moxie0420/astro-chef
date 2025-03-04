import { computed } from "nanostores";
import { $currentRecipe, $recipes } from "./recipes";

export const $currentIngredients = computed([$currentRecipe, $recipes], () => {
  const recipe = $recipes
    .get()
    .find((recipe) => recipe.id == $currentRecipe.get());
  return recipe?.ingredients;
});
