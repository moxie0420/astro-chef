import { z } from "astro:schema";

export type recipeShape = z.infer<typeof recipeShape>;

export const recipeShape = z.object({
  title: z.string(),
  author: z.string(),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  description: z.string().optional(),
  body: z.string().optional(),
  image: z.string().default("default.png").optional(),
  imageAlt: z.string().default("The default image aka the logo").optional(),
});
