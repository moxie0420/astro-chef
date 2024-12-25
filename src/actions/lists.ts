import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db } from "@db/index";
import { recipe, list } from "@db/schema";
import { eq, inArray } from "drizzle-orm";

export const lists = {
  getLists: defineAction({
    handler: async () => {
      return await db.select().from(list);
    },
  }),
  getList: defineAction({
    input: z.object({
      method: z.string(),
      id: z.string(),
    }),
    handler: async ({ method, id }) => {
      if (method === "id")
        return await db.query.list.findFirst({
          where: eq(list.id, parseInt(id)),
          with: {
            recipes: true,
          },
        });

      return await db.query.list.findFirst({
        where: eq(list.title, id),
        with: {
          recipes: true,
        },
      });
    },
  }),
  getRecipes: defineAction({
    input: z.object({
      ids: z.number().array(),
    }),
    handler: async ({ ids }) => {
      return await db.select().from(recipe).where(inArray(recipe.id, ids));
    },
  }),
  removeRecipe: defineAction({
    input: z.object({
      listId: z.number(),
      recipeId: z.number(),
    }),
    handler: async ({ listId }) => {
      const res = (
        await db.select({ current: list }).from(list).where(eq(list.id, listId))
      )[0];
    },
  }),
  setImageAlt: defineAction({
    accept: "form",
    input: z.object({
      alt: z.string(),
      id: z.number(),
    }),
    handler: async (input) => {
      await db
        .update(list)
        .set({
          imageAlt: input.alt,
        })
        .where(eq(list.id, input.id));
    },
  }),
  setImage: defineAction({
    handler: () => {},
  }),
  addRecipeToList: defineAction({
    input: z.object({
      recipeId: z.number(),
      listId: z.number(),
    }),
    handler: async () => {},
  }),
};
