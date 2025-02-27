import { publicProcedure, router } from "@lib/trpc";
import { z } from "astro:schema";
import { Fraction } from "fraction.js";
import { PGLite } from "src/data-source";
import { Ingredient } from "src/entity/Ingredient";
import type { unit } from "src/entity/Ingredient/units";
import { Recipe } from "src/entity/Recipe";

const unit = z.custom<unit>();

const ingredientShape = z.object({
  name: z.string(),
  amount: z.string(),
  unit,
});

export const ingredientRouter = router({
  create: publicProcedure
    .input(
      z.object({
        data: ingredientShape,
        recipeId: z.number(),
      }),
    )
    .mutation(
      async ({
        input: {
          data: { name, amount, unit },
          recipeId,
        },
      }) => {
        const ingredientRepo = PGLite.getRepository(Ingredient);

        const recipe = await PGLite.getRepository(Recipe).findOneByOrFail({
          id: recipeId,
        });

        const fraction = new Fraction(amount);
        const ingredient = ingredientRepo.create({
          recipe,
          name,
          unit,
          fraction: fraction.simplify().toFraction(),
          whole: fraction.valueOf(),
        });

        await ingredientRepo.save(ingredient);
      },
    ),
  read: publicProcedure
    .input(z.number({ description: "Ingredient ID" }))
    .query(({ input: id }) =>
      PGLite.getRepository(Ingredient).findOne({ where: { id } }),
    ),
  update: publicProcedure
    .input(
      z.object({
        data: ingredientShape,
        id: z.number(),
      }),
    )
    .mutation(({ input: { data, id } }) =>
      PGLite.getRepository(Ingredient).update({ id }, data),
    ),
  delete: publicProcedure
    .input(z.number({ description: "Ingredient ID" }))
    .mutation(({ input: id }) => PGLite.getRepository(Ingredient).delete(id)),
});
