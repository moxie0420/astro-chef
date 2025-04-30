import type { infer as ZodInfer } from "zod";
import { z } from "zod";
import { Ingredient, uuid } from "./validations";
import { v4 as uuidv4 } from "uuid";

export const RecipeShape = z.object({
  _id: uuid.default(uuidv4()),
  title: z
    .string({
      required_error: "A title is required",
      invalid_type_error: "The title must be a string",
    })
    .max(256, {
      message: "The title must be 256 or fewer characters long",
    }),
  author: z
    .string({
      required_error: "An author is required",
    })
    .max(128, {
      message: "Author must be 128 or fewer characters long",
    }),
  about: z
    .object({
      description: z
        .string()
        .max(512, {
          message: "The description must be 512 or fewer characters long",
        })
        .optional(),
      cookTime: z
        .string()
        .max(128, {
          message: "Cook time must be 128 or fewer characters long",
        })
        .optional(),
      prepTime: z
        .string()
        .max(128, {
          message: "Prep time must be 128 or fewer characters long",
        })
        .optional(),
    })
    .optional(),
  image: z
    .object({
      url: z.string().url(),
      description: z.string().max(512, {
        message: "The description must be 512 or fewer characters long",
      }),
    })
    .optional(),
  ingredients: z.array(Ingredient).default([]).optional(),
  body: z.string().optional(),
  created: z
    .date({ invalid_type_error: "That's not a date!" })
    .default(new Date())
    .optional(),
  edited: z
    .date({ invalid_type_error: "That's not a date!" })
    .default(new Date())
    .optional(),
  liked: z
    .boolean({ invalid_type_error: "liked must be a boolean" })
    .default(false)
    .optional(),
});

export type RecipeType = ZodInfer<typeof RecipeShape>;
