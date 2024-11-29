import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { db, eq, Ingredient, ne } from "astro:db";
import { recipe } from './recipe';

export const ingredient = {
    getIngredients: defineAction({
        input: z.object({
            recipeId: z.number(),
        }),
        handler: async (input) => {
            const ingredients = await db.select().from(Ingredient).where(eq(Ingredient.recipeId, input.recipeId))
            if (!ingredients) throw new ActionError({
                code: "NOT_FOUND",
                message: "No ingredients found for recipe " + input.recipeId,
            });

            if (ingredients.length === 0) throw new ActionError({
                code: "NOT_FOUND",
                message: "No ingredients found for recipe " + input.recipeId,
            });

            return ingredients;
        }
    }),
    addIngredient: defineAction({
        input: z.object({
            recipeId: z.number(),
            name: z.string(),
            amount: z.string(),
            unit: z.string(),
        }),
        handler: async (input) => {
            db.insert(Ingredient).values(input);
        },
    })
};