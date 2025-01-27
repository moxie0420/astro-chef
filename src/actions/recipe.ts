import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import {
  db,
  filterByLiked,
  recipeSearch,
  sortBy,
  withPagination,
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
      sort: z
        .enum(["random", "popular", "by-id", "title", "views"])
        .optional()
        .nullable(),
      filter: z
        .array(z.enum(["liked"]).or(z.string()))
        .optional()
        .nullable(),
      query: z.string().optional().nullable(),
      page: z.number().optional().default(1),
    }),
    handler: async ({ number, sort, filter, query, page }) => {
      let q = db.select().from(recipe).$dynamic();

      q = withPagination(q, page, number || 25);

      if (sort && sort != null) q = sortBy(q, sort, recipe);
      else q = sortBy(q, "popular", recipe);

      if (typeof query === "string" && query !== "") q = recipeSearch(q, query);

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
      title: z.string().optional().default(""),
      author: z.string().optional().default("No Author Yet"),
      edited: z.string().optional().default(new Date().toLocaleDateString()),
      prepTime: z.string().optional().default(""),
      cookTime: z.string().optional().default(""),
      description: z.string().optional().default(""),
      body: z.string().optional().default(""),
      image: z.string().optional().default(""),
      imageAlt: z.string().optional().default("Not Set Yet"),
      totalViews: z.number().optional().default(0),
    }),
    handler: async (input) => {
      return await db
        .update(recipe)
        .set({ ...input, edited: new Date() })
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
