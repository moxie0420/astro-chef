import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db } from "@db/index";
import { ingredients } from "@db/schema/ingredients";
import { eq } from "drizzle-orm";

import Fraction from "fraction.js";

export const ingredient = {
  getIngredients: defineAction({
    input: z.object({
      recipeId: z.number(),
    }),
    handler: async (input) => {
      const ingredientList = await db.query.ingredients.findMany({
        where: (ingredients, { eq }) =>
          eq(ingredients.recipeId, input.recipeId),
        orderBy: ingredients.name,
      });
      if (!ingredientList)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      if (ingredientList.length === 0)
        throw new ActionError({
          code: "NOT_FOUND",
          message: "No ingredients found for recipe " + input.recipeId,
        });

      return ingredientList;
    },
  }),
  addIngredient: defineAction({
    input: z.object({
      recipeId: z.number(),
      amount: z.union([z.string(), z.number()]),
      name: z.string(),
      unit: z.string(),
    }),
    handler: async ({ recipeId, amount, name, unit }) => {
      const val = new Fraction(amount);

      const newIngredient = {
        name: name,
        unit: unit,
        fraction: val.toFraction(true),
        whole: val.valueOf(),
        recipeId: recipeId,
      };

      await db.insert(ingredients).values(newIngredient);
    },
  }),
  removeIngredient: defineAction({
    input: z.object({
      ingredientId: z.number(),
    }),
    handler: async (input) =>
      await db
        .delete(ingredients)
        .where(eq(ingredients.id, input.ingredientId)),
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
