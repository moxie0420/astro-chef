import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { db, desc, eq, Recipe, sql, and, like, or } from "astro:db";

export const recipe = {
  setLiked: defineAction({
    input: z.object({
      liked: z.coerce.boolean(),
      id: z.coerce.number(),
    }),
    handler: async ({ liked, id }) => {
      await db.update(Recipe).set({ liked: liked }).where(eq(Recipe.id, id));
    },
  }),
  getRandom: defineAction({
    handler: async () => {
      const [{ id }] = await db
        .select({ id: Recipe.id })
        .from(Recipe)
        .orderBy(sql`RANDOM()`)
        .limit(1);
      return id;
    },
  }),
  getRecipes: defineAction({
    input: z.object({
      number: z.coerce.number().optional().nullable(),
      sort: z.enum(["random", "popular", "by-id"]),
      filter: z.array(z.string()).optional(),
      query: z.string().optional().nullable(),
    }),
    handler: async ({ number, sort, filter, query }) => {
      let sortBy;
      switch (sort) {
        case "by-id":
          sortBy = Recipe.id;
        case "popular":
          sortBy = desc(Recipe.totalViews);
        case "random":
          sortBy = sql`RANDOM()`;
          break;
      }

      if (filter && filter.filter((f) => f == "liked")) {
        return await db
          .select()
          .from(Recipe)
          .limit(number || 20)
          .orderBy(sortBy)
          .where(
            and(
              eq(Recipe.liked, true),
              or(
                like(Recipe.body, `%${query}%`),
                like(Recipe.title, `%${query}%`)
              )
            )
          );
      }

      if (query)
        return await db
          .select()
          .from(Recipe)
          .limit(number || 25)
          .orderBy(sortBy)
          .where(
            or(
              like(Recipe.body, `%${query}%`),
              like(Recipe.title, `%${query}%`)
            )
          );

      return await db
        .select()
        .from(Recipe)
        .limit(number || 25)
        .orderBy(sortBy);
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
      image: z.string().optional(),
      imageAlt: z.string().optional(),
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
