import { publicProcedure, router } from "@lib/trpc";
import { partialRecipeShape, recipeShape } from "@lib/validations";
import { z } from "astro:schema";
import { PGLite } from "src/data-source";
import { Recipe } from "src/entity/Recipe";
import { getSorting } from "src/entity/Recipe/helpers";

export const recipeRouter = router({
  getMultiple: publicProcedure
    .input(
      z
        .object({
          sort: z
            .union([
              z.literal("popular"),
              z.literal("by-id"),
              z.literal("title"),
            ])
            .optional(),
          query: z.string().optional(),
        })
        .optional(),
    )
    .query(
      async ({ input }) =>
        await Recipe.find({
          order: getSorting(input?.sort || "title"),
        }),
    ),
  create: publicProcedure
    .input(partialRecipeShape)
    .mutation(async ({ input }) => {
      console.log("creating recipe");
      const recipe = Recipe.create({ ...input });
      recipe.save();
    }),
  update: publicProcedure
    .input(
      z.object({
        data: recipeShape.partial(),
        id: z.string(),
      }),
    )
    .mutation(
      async ({ input: { data, id } }) => await Recipe.update({ id }, data),
    ),
  delete: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
    .mutation(
      async ({ input: id }) => await PGLite.getRepository(Recipe).delete(id),
    ),
  setLiked: publicProcedure
    .input(
      z.object({
        id: z.string({ description: "Recipe UUID" }),
        value: z.boolean(),
      }),
    )
    .mutation(
      async ({ input: { id, value } }) =>
        await Recipe.update({ id }, { liked: value }),
    ),
});
