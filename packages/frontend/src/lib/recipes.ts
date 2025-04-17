import createIndexedDBAdapter from '@signaldb/indexeddb';
import type { infer as ZodInfer } from 'zod';
import { z } from 'zod';
import { Ingredient, SchemaCollection, uuid } from './validations';
import solidReactivityAdapter from '@signaldb/solid';

export const RecipeShape = z.object({
  id: uuid,
  title: z.string(),
  subtitle: z.string().optional(),
  author: z.string(),
  about: z
    .object({
      description: z.string(),
      cookTime: z.string(),
      prepTime: z.string(),
    })
    .optional(),
  image: z
    .object({
      url: z.string(),
      description: z.string(),
    })
    .optional(),
  ingredients: z.array(Ingredient).default([]).optional(),
  body: z.string().default('').optional(),
  created: z.date().default(new Date()).optional(),
  edited: z.date().default(new Date()).optional(),
  liked: z.boolean().default(false).optional(),
});

export type RecipeType = ZodInfer<typeof RecipeShape>;

const Recipes = new SchemaCollection({
  schema: RecipeShape,
  reactivity: solidReactivityAdapter,
  persistence: createIndexedDBAdapter<ZodInfer<typeof RecipeShape>, string>(
    'recipes',
  ),
});

export default Recipes;
