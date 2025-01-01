import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import {
  db,
  filterByLiked,
  sortBy,
  withPagination,
  recipeSearch,
} from "@db/index";
import { recipe } from "@db/schema";
import { eq } from "drizzle-orm";

export const Recipe = {
  setLiked: defineAction({
    input: z.object({
      liked: z.coerce.boolean(),
      id: z.coerce.number(),
    }),
    handler: async ({ liked, id }) => {
      await db.update(recipe).set({ liked: liked }).where(eq(recipe.id, id));
    },
  }),
  getRandom: defineAction({
    handler: async () => {
      const id = await db.query.recipe.findFirst({
        with: {
          ingredients: true,
        },
      });
      return id;
    },
  }),
  getRecipes: defineAction({
    input: z.object({
      number: z.coerce.number().optional().nullable(),
      sort: z.enum(["random", "popular", "by-id", "title", "views"]),
      filter: z.array(z.enum(["liked"]).or(z.string())).optional(),
      query: z.string().optional().nullable(),
      page: z.number().optional().default(1),
    }),
    handler: async ({ number, sort, filter, query, page }) => {
      let q = db.select().from(recipe).$dynamic();

      q = withPagination(q, page, number || 25);

      q = sortBy(q, sort, recipe);

      if (typeof query === "string") q = recipeSearch(q, query);

      filter?.forEach((filter) => {
        switch (filter) {
          case "liked":
            q = filterByLiked(q, recipe);
            break;
        }
      });

      const res = await q;
      return res;
    },
  }),
  getRecipe: defineAction({
    input: z.object({
      method: z.string().optional(),
      identifier: z.coerce.string().optional(),
    }),
    handler: async ({ method, identifier }) => {
      if (method == "id") {
        const res = await db.query.recipe.findFirst({
          with: {
            ingredients: true,
          },
          where: eq(recipe.id, parseInt(identifier as string)),
        });

        if (!recipe)
          throw new ActionError({
            code: "NOT_FOUND",
            message: "recipe " + identifier + " was not found",
          });

        return res;
      }

      if (method == "title") {
        const res = await db.query.recipe.findFirst({
          with: {
            ingredients: true,
          },
          where: eq(recipe.title, identifier as string),
        });

        if (!recipe)
          throw new ActionError({
            code: "NOT_FOUND",
            message: "recipe " + identifier + " was not found",
          });
        return res;
      }
    },
  }),
  updateRecipe: defineAction({
    input: z.object({
      id: z.number(),
      title: z.string().optional(),
      author: z.string().optional(),
      prepTime: z.string().time().optional(),
      cookTime: z.string().time().optional(),
      description: z.string().optional(),
      body: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      totalViews: z.number().optional(),
    }),
    handler: async (input) => {
      return await db
        .update(recipe)
        .set(input)
        .where(eq(recipe.id, input.id))
        .returning();
    },
  }),
  delete: defineAction({
    input: z.number(),
    handler: async (input) =>
      await db.delete(recipe).where(eq(recipe.id, input)),
  }),
};
