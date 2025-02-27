import { getEventEmitter } from "@lib/events";
import { publicProcedure, router } from "@lib/trpc";
import { z } from "astro:schema";
import { PGLite } from "src/data-source";
import { Recipe } from "src/entity/Recipe";
import { getSorting } from "src/entity/Recipe/helpers";

const ee = getEventEmitter();

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
  getSingle: publicProcedure.input(z.number()).query(
    async ({ input }) =>
      await PGLite.getRepository(Recipe).findOne({
        where: { id: input },
        select: {
          author: true,
          body: true,
          cookTime: true,
          created: true,
          description: true,
          edited: true,
          id: true,
          image: true,
          imageAlt: true,
          liked: true,
          prepTime: true,
          title: true,
          views: true,
        },
        relations: {
          ingredients: false,
        },
      }),
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
          select: { id: true },
        }),
    ),
  create: publicProcedure.input(recipeShape).mutation(async ({ input }) => {
    const res = await PGLite.getRepository(Recipe).insert(input);
    console.log("sending event to sse");
    ee.emit("update", { type: "refetch" });
    return res;
  }),
  update: publicProcedure
    .input(
      z.object({
        data: recipeShape,
        id: z.number(),
      }),
    )
    .mutation(async ({ input: { data, id } }) => {
      const res = await PGLite.getRepository(Recipe).update({ id }, data);
      ee.emit("update", { type: "refetch" });
      return res;
    }),
  delete: publicProcedure
    .input(z.number({ description: "Recipe ID" }))
    .mutation(async ({ input: id }) => {
      const res = await PGLite.getRepository(Recipe).delete(id);
      ee.emit("update", { type: "refetch" });
      return res;
    }),
  like: publicProcedure
    .input(z.number({ description: "Recipe ID" }).nullable())
    .mutation(async ({ input: id }) => {
      if (!id || id < 1) return;
      const res = await PGLite.getRepository(Recipe).update(
        { id },
        { liked: true },
      );
      ee.emit("update", { type: "refetch" });
      return res;
    }),
  dislike: publicProcedure
    .input(z.number({ description: "Recipe ID" }).nullable())
    .mutation(async ({ input: id }) => {
      if (!id || id < 1) return;
      const res = await PGLite.getRepository(Recipe).update(
        { id },
        { liked: false },
      );
      ee.emit("update", { type: "refetch" });
      return res;
    }),
});
