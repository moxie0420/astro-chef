import { ActionError, defineAction } from "astro:actions";
import { experimental_AstroContainer } from "astro/container";
import { z } from "astro:schema";

import { db, eq, Ingredient } from "astro:db";

import IngredientsContent from "@components/ingredients/ingredientsContent.astro";

export const ingredient = {
  getIngredients: defineAction({
    input: z.object({
      recipeId: z.number(),
    }),
    handler: async (input) => {
      const ingredients = await db
        .select()
        .from(Ingredient)
        .where(eq(Ingredient.recipeId, input.recipeId));
      if (!ingredients)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      if (ingredients.length === 0)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      return ingredients;
    },
  }),
  addIngredient: defineAction({
    accept: "form",
    input: z.object({
      recipeId: z.number(),
      name: z.string(),
      amount: z.string(),
      unit: z.string(),
    }),
    handler: async (input) => {
      return await db.insert(Ingredient).values(input).returning();
    },
  }),
  removeIngredient: defineAction({
    input: z.object({
      ingredientId: z.number(),
    }),
    handler: async (input) => {
      console.log("removing ingredient: " + input.ingredientId);
      await db.delete(Ingredient).where(eq(Ingredient.id, input.ingredientId));
    },
  }),
  updateIngredient: defineAction({
    input: z.object({
      ingredientId: z.number(),
      name: z.string().optional(),
      amount: z.string().optional(),
      unit: z.string().optional(),
    }),
    handler: async (input) => {
      const updatedIngredient = await db
        .update(Ingredient)
        .set(input)
        .where(eq(Ingredient.id, input.ingredientId))
        .returning();
      return updatedIngredient;
    },
  }),
};
