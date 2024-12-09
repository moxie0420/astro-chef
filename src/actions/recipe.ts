import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db, eq, Recipe, count } from "astro:db";

export const recipe = {
  getRandom: defineAction({
    handler: async () => {
      const [counted] = await db.select({ count: count() }).from(Recipe);
      const [{ id }] = await db
        .select({ id: Recipe.id })
        .from(Recipe)
        .orderBy(Recipe.id)
        .limit(1)
        .offset(Math.floor(Math.random() * counted.count));
      return id;
    },
  }),
  getRecipes: defineAction({
    input: z.object({
      number: z.number().optional(),
    }),
    handler: async ({ number }) => {
      const [counted] = await db.select({ count: count() }).from(Recipe);
      return await db
        .select()
        .from(Recipe)
        .limit(number || 10)
        .offset(
          number && number < counted.count
            ? Math.floor(Math.random() * counted.count)
            : 0,
        );
    },
  }),
  getRecipe: defineAction({
    input: z.object({
      method: z.string().optional(),
      identifier: z.coerce.string().optional(),
    }),
    handler: async ({ method, identifier }) => {
      if (method == "id") {
        const [recipe] = await db
          .select()
          .from(Recipe)
          .where(eq(Recipe.id, parseInt(identifier as string)));

        if (!recipe)
          throw new ActionError({
            code: "NOT_FOUND",
            message: "recipe " + identifier + " was not found",
          });

        return recipe;
      }

      if (method == "title") {
        const [recipe] = await db
          .select()
          .from(Recipe)
          .where(eq(Recipe.title, identifier as string));

        if (!recipe)
          throw new ActionError({
            code: "NOT_FOUND",
            message: "recipe " + identifier + " was not found",
          });
        return recipe;
      }
    },
  }),
  updateRecipe: defineAction({
    accept: "form",
    input: z.object({
      id: z.number(),
      title: z.string().optional(),
      author: z.string().optional(),
      prepTime: z.string().time().optional(),
      cookTime: z.string().time().optional(),
      description: z.string().optional(),
      body: z.string().optional(),
    }),
    handler: async (input) => {
      const updatedRecipe = await db
        .update(Recipe)
        .set(input)
        .where(eq(Recipe.id, input.id))
        .returning();
      return updatedRecipe;
    },
  }),
};
