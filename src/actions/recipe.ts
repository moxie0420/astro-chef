import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { db, eq, Recipe } from "astro:db";

export const recipe = {
    getRecipe: defineAction({
        input: z.object({
            id: z.string().optional(),
            title: z.string().optional(),
        }),
        handler: async (input) => {
            if (input.title) {
                const [recipe] = await db
                    .select()
                    .from(Recipe)
                    .where(eq(Recipe.title, input.title));

                if (!recipe) throw new ActionError({
                    code: "NOT_FOUND",
                    message: "recipe " + input.id + " was not found"
                });
                return recipe;
            }
            if (input.id) {
                const [recipe] = await db
                    .select()
                    .from(Recipe)
                    .where(eq(Recipe.id, parseInt(input.id)));

                if (!recipe) throw new ActionError({
                    code: "NOT_FOUND",
                    message: "recipe " + input.id + " was not found"
                });

                return recipe;
            }
        }
    }),
    updateRecipe: defineAction({
        accept: "form",
        input: z.object({
            title: z.string().optional(),
            author: z.string().optional(),
            prepTime: z.string().time().optional(),
            cookTime: z.string().time().optional(),
            description: z.string().optional(),
            body: z.string().optional(),
        }),
        handler: async (input) => {
            const updatedRecipe = await db
                .update(Recipe)
                .set(input)
                .returning();
            return updatedRecipe;
        }
    })
};