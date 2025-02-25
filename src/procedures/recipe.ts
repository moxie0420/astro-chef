import { getSorting } from "@lib/recipe";
import { publicProcedure, router } from "@lib/trpc";
import { z } from "astro:schema";
import { PGLite } from "src/data-source";
import { Recipe } from "src/entity/Recipe";

const recipeShape = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  description: z.string().optional(),
  body: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  totalViews: z.number().optional(),
});

export const recipeRouter = router({
  ingredients: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
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
  getSingle: publicProcedure
    .input(z.number())
    .query(
      async ({ input }) =>
        await PGLite.manager.findOneByOrFail(Recipe, { id: input }),
    ),
  getRandom: publicProcedure.query(
    async () =>
      await PGLite.getRepository(Recipe)
        .createQueryBuilder()
        .orderBy("RANDOM()")
        .getMany(),
  ),
  getMultiple: publicProcedure
    .input(
      z.object({
        number: z.number().optional(),
        sort: z
          .union([z.literal("popular"), z.literal("by-id"), z.literal("title")])
          .optional(),
        query: z.string().optional(),
      }),
    )
    .query(
      async ({ input }) =>
        await PGLite.getRepository(Recipe).find({
          order: getSorting(input.sort || "title"),
        }),
    ),
  create: publicProcedure
    .input(recipeShape)
    .mutation(
      async ({ input }) => await PGLite.getRepository(Recipe).insert(input),
    ),
  update: publicProcedure
    .input(
      z.object({
        data: recipeShape,
        id: z.number(),
      }),
    )
    .mutation(
      async ({ input: { data, id } }) =>
        await PGLite.getRepository(Recipe).update({ id }, data),
    ),
  delete: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
    .mutation(
      async ({ input: id }) => await PGLite.getRepository(Recipe).delete(id),
    ),
  like: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
    .mutation(
      async ({ input: id }) =>
        await PGLite.getRepository(Recipe).update({ id }, { liked: true }),
    ),
  dislike: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
    .mutation(
      async ({ input: id }) =>
        await PGLite.getRepository(Recipe).update({ id }, { liked: false }),
    ),
});
