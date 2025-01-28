import { relations } from "drizzle-orm";
import { integer, pgTable, real, varchar } from "drizzle-orm/pg-core";
import { recipe } from "./recipe";

export const ingredients = pgTable("Ingredients", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  recipeId: integer().notNull(),
  name: varchar({ length: 255 }).notNull(),
  unit: varchar({ length: 255 }).notNull(),
  whole: real().notNull(),
  fraction: varchar({ length: 255 }).notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipe, {
    fields: [ingredients.recipeId],
    references: [recipe.id],
  }),
}));
