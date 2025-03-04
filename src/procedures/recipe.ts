import { publicProcedure, router } from "@lib/trpc";
import { recipeShape } from "@lib/validations";
import { z } from "astro:schema";
import { PGLite } from "src/data-source";
import { Recipe } from "src/entity/Recipe";
import { getSorting } from "src/entity/Recipe/helpers";

export const recipeRouter = router({
  ingredients: publicProcedure
    .input(z.string({ description: "Recipe UUID" }))
    .query(async ({ input: id }) => {
      const res = await PGLite.getRepository(Recipe).findOne({
        where: {
          id: id,
        },
        relations: {
          ingredients: true,
        },
      });
      return res?.ingredients;
    }),
  getSingle: publicProcedure.input(z.string()).query(
    async ({ input }) =>
      await Recipe.findOne({
        where: { id: input },
        relations: {
          ingredients: false,
        },
      }),
  ),
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
  create: publicProcedure.input(recipeShape).mutation(async ({ input }) => {
    console.log("creating recipe");
    const recipe = new Recipe();
    recipe.title = input.title;
    recipe.author = input.author;
    recipe.save();
  }),
  update: publicProcedure
    .input(
      z.object({
        data: recipeShape,
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
      async ({ input: { id } }) => await Recipe.update({ id }, { liked: true }),
    ),
});
