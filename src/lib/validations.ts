import { z } from "astro:schema";

export type recipeShapeType = z.infer<typeof recipeShape>;

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
