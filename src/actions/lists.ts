import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import {
  db,
  desc,
  eq,
  RecipeList,
  sql,
  and,
  like,
  or,
  Recipe,
  inArray,
} from "astro:db";

export const list = {
  getLists: defineAction({
    handler: async () => {
      return await db.select().from(RecipeList);
    },
  }),
  getList: defineAction({
    input: z.object({
      method: z.string(),
      id: z.string(),
    }),
    handler: async ({ method, id }) => {
      if (method === "id")
        return await db
          .select()
          .from(RecipeList)
          .where(eq(RecipeList.id, parseInt(id)));

      return await db.select().from(RecipeList).where(eq(RecipeList.name, id));
    },
  }),
  getRecipes: defineAction({
    input: z.object({
      ids: z.number().array(),
    }),
    handler: async ({ ids }) => {
      return await db.select().from(Recipe).where(inArray(Recipe.id, ids));
    },
  }),
  removeRecipe: defineAction({
    input: z.object({
      listId: z.number(),
      recipeId: z.number(),
    }),
    handler: async ({ listId, recipeId }) => {
      const res = (
        await db
          .select({ current: RecipeList.recipes })
          .from(RecipeList)
          .where(eq(RecipeList.id, listId))
      )[0];

      const current = JSON.parse(res.current as string) as number[];
      const updated = current.filter((id) => id !== recipeId);

      await db
        .update(RecipeList)
        .set({ recipes: JSON.stringify(updated) })
        .where(eq(RecipeList.id, listId));
    },
  }),
};
