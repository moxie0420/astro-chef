import { z } from "zod";
import type { infer as ZodInfer } from "zod";

export const uuid = z.string().uuid();

export const Ingredient = z.object({
  name: z.string(),
  amount: z.object({
    decimal: z.number(),
    fraction: z.string(),
  }),
  unit: z.string(),
});

export type IngredientType = ZodInfer<typeof Ingredient>;
