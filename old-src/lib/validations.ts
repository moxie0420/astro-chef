import { z } from "astro:schema";

export type recipeShapeType = z.infer<typeof recipeShape>;
export type partialRecipeShapeType = z.infer<typeof partialRecipeShape>;

export const recipeShape = z.object({
  title: z.string(),
  author: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  description: z.string(),
  body: z.string(),
  image: z.string().default("default.png"),
  imageAlt: z.string().default("The default image aka the logo"),
});

export const partialRecipeShape = recipeShape.partial();

export type searchOptions = z.infer<typeof searchOptions>;

export const searchOptions = z.object({
  search: z.string().optional(),
  sorting: z.enum(["random", "popular", "title", "by-id"]).default("title"),
});
