import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db } from "@db/index";
import { ingredients } from "@db/schema";
import { eq } from "drizzle-orm";

export const ingredient = {
  getIngredients: defineAction({
    input: z.object({
      recipeId: z.number(),
    }),
    handler: async (input) => {
      const ingredient = await db
        .select()
        .from(ingredients)
        .where(eq(ingredients.recipeId, input.recipeId))
        .orderBy(ingredients.name);
      if (!ingredient)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      if (ingredient.length === 0)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      return ingredients;
    },
  }),
  addIngredient: defineAction({
    input: z.object({
      recipeId: z.number(),
      name: z.string(),
      unit: z.string(),
      whole: z.number(),
      fraction: z.string(),
    }),
    handler: async (input) => {
      console.log(`adding ${input.name}`);
      return await db.insert(ingredients).values(input).returning();
    },
  }),
  removeIngredient: defineAction({
    input: z.object({
      ingredientId: z.number(),
    }),
    handler: async (input) => {
      console.log("removing ingredient: " + input.ingredientId);
      await db
        .delete(ingredients)
        .where(eq(ingredients.id, input.ingredientId));
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
        .update(ingredients)
        .set(input)
        .where(eq(ingredients.id, input.ingredientId))
        .returning();
      return updatedIngredient;
    },
  }),
};
